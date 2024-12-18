import pytest
from fastapi import status


class TestItems:
    @pytest.mark.asyncio(loop_scope="session")
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

    @pytest.mark.asyncio(loop_scope="session")
    async def test_read_items(self, test_client, db_session, authenticated_user):
        """Test reading items."""
        # Create multiple items
        items_data = [
            {"name": "First Item", "description": "First Description"},
            {"name": "Second Item", "description": "Second Description"},
        ]

        for item_data in items_data:
            await test_client.post(
                "/items/", json=item_data, headers=authenticated_user["headers"]
            )

        # Read items
        read_response = await test_client.get(
            "/items/", headers=authenticated_user["headers"]
        )
        assert read_response.status_code == status.HTTP_200_OK
        items = read_response.json()

        assert (
            len(items) >= 2
        )  # Using >= because previous tests might have created items
        assert any(item["name"] == "First Item" for item in items)
        assert any(item["name"] == "Second Item" for item in items)

    @pytest.mark.asyncio(loop_scope="session")
    async def test_delete_item(self, test_client, db_session, authenticated_user):
        """Test deleting an item."""
        # Create an item
        item_data = {"name": "Item to Delete", "description": "Will be deleted"}
        create_response = await test_client.post(
            "/items/", json=item_data, headers=authenticated_user["headers"]
        )
        created_item = create_response.json()

        # Delete the item
        delete_response = await test_client.delete(
            f"/items/{created_item['id']}", headers=authenticated_user["headers"]
        )
        assert delete_response.status_code == status.HTTP_200_OK

        # Verify item is deleted
        read_response = await test_client.get(
            "/items/", headers=authenticated_user["headers"]
        )
        items = read_response.json()
        assert not any(item["id"] == created_item["id"] for item in items)

    @pytest.mark.asyncio(loop_scope="session")
    async def test_delete_nonexistent_item(self, test_client, authenticated_user):
        """Test deleting an item that doesn't exist."""
        # Try to delete non-existent item
        delete_response = await test_client.delete(
            "/items/00000000-0000-0000-0000-000000000000",
            headers=authenticated_user["headers"],
        )
        assert delete_response.status_code == status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio(loop_scope="session")
    async def test_unauthorized_access(self, test_client):
        """Test accessing endpoints without authentication."""
        # Try to read items without authentication
        response = await test_client.get("/items/")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

        # Try to create item without authentication
        item_data = {"name": "Unauthorized Item", "description": "Should fail"}
        response = await test_client.post("/items/", json=item_data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

        # Try to delete item without authentication
        response = await test_client.delete(
            "/items/00000000-0000-0000-0000-000000000000"
        )
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
