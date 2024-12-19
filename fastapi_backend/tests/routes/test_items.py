import pytest
from fastapi import status
from sqlalchemy import select, insert
from app.models import Item


class TestItems:
    @pytest.mark.asyncio(loop_scope="function")
    async def test_create_item(self, test_client, db_session, authenticated_user):
        """Test creating an item."""
        item_data = {"name": "Test Item", "description": "Test Description"}
        create_response = await test_client.post(
            "/items/", json=item_data, headers=authenticated_user["headers"]
        )

        assert create_response.status_code == status.HTTP_200_OK
        created_item = create_response.json()
        assert created_item["name"] == item_data["name"]
        assert created_item["description"] == item_data["description"]

        # Check if the item is in the database
        item = await db_session.execute(
            select(Item).where(Item.id == created_item["id"])
        )
        item = item.scalar()

        assert item is not None
        assert item.name == item_data["name"]
        assert item.description == item_data["description"]

    @pytest.mark.asyncio(loop_scope="function")
    async def test_read_items(self, test_client, db_session, authenticated_user):
        """Test reading items."""
        # Create multiple items
        items_data = [
            {
                "name": "First Item",
                "description": "First Description",
                "user_id": authenticated_user["user"].id,
            },
            {
                "name": "Second Item",
                "description": "Second Description",
                "user_id": authenticated_user["user"].id,
            },
        ]
        # create items in the database
        for item_data in items_data:
            await db_session.execute(insert(Item).values(**item_data))

        # Read items
        read_response = await test_client.get(
            "/items/", headers=authenticated_user["headers"]
        )
        assert read_response.status_code == status.HTTP_200_OK
        items = read_response.json()

        assert len(items) == 2
        assert any(item["name"] == "First Item" for item in items)
        assert any(item["name"] == "Second Item" for item in items)

    @pytest.mark.asyncio(loop_scope="function")
    async def test_delete_item(self, test_client, db_session, authenticated_user):
        """Test deleting an item."""
        # Create an item directly in the database
        item_data = {
            "name": "Item to Delete",
            "description": "Will be deleted",
            "user_id": authenticated_user["user"].id,
        }
        await db_session.execute(insert(Item).values(**item_data))

        # Get the created item from database
        db_item = (
            await db_session.execute(select(Item).where(Item.name == item_data["name"]))
        ).scalar()

        # Delete the item
        delete_response = await test_client.delete(
            f"/items/{db_item.id}", headers=authenticated_user["headers"]
        )
        assert delete_response.status_code == status.HTTP_200_OK

        # Verify item is deleted from database
        db_check = (
            await db_session.execute(select(Item).where(Item.id == db_item.id))
        ).scalar()
        assert db_check is None

    @pytest.mark.asyncio(loop_scope="function")
    async def test_delete_nonexistent_item(self, test_client, authenticated_user):
        """Test deleting an item that doesn't exist."""
        # Try to delete non-existent item
        delete_response = await test_client.delete(
            "/items/00000000-0000-0000-0000-000000000000",
            headers=authenticated_user["headers"],
        )
        assert delete_response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio(loop_scope="function")
    async def test_unauthorized_read_items(self, test_client):
        """Test reading items without authentication."""
        response = await test_client.get("/items/")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    @pytest.mark.asyncio(loop_scope="function")
    async def test_unauthorized_create_item(self, test_client):
        """Test creating item without authentication."""
        item_data = {"name": "Unauthorized Item", "description": "Should fail"}
        response = await test_client.post("/items/", json=item_data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    @pytest.mark.asyncio(loop_scope="function")
    async def test_unauthorized_delete_item(self, test_client):
        """Test deleting item without authentication."""
        response = await test_client.delete(
            "/items/00000000-0000-0000-0000-000000000000"
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
