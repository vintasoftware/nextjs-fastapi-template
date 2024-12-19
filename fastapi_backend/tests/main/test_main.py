import pytest
from fastapi import status
from fastapi_users.router import ErrorCode
from sqlalchemy import select
from app.models import User


class TestPasswordValidation:
    @pytest.mark.parametrize(
        "email, password, expected_status, expected_detail",
        [
            (
                "test@example.com",
                "short",
                status.HTTP_400_BAD_REQUEST,
                {
                    "detail": {
                        "code": ErrorCode.REGISTER_INVALID_PASSWORD.value,
                        "reason": ["Password should be at least 8 characters."],
                    }
                },
            ),
            (
                "test@example.com",
                "test@example.com",
                status.HTTP_400_BAD_REQUEST,
                {
                    "detail": {
                        "code": ErrorCode.REGISTER_INVALID_PASSWORD.value,
                        "reason": ["Password should not contain e-mail."],
                    }
                },
            ),
            (
                "test@example.com",
                "lowercasepassword",
                status.HTTP_400_BAD_REQUEST,
                {
                    "detail": {
                        "code": ErrorCode.REGISTER_INVALID_PASSWORD.value,
                        "reason": [
                            "Password should contain at least one uppercase letter."
                        ],
                    }
                },
            ),
            (
                "test@example.com",
                "Nosppecialchar1",
                status.HTTP_400_BAD_REQUEST,
                {
                    "detail": {
                        "code": ErrorCode.REGISTER_INVALID_PASSWORD.value,
                        "reason": [
                            "Password should contain at least one special character."
                        ],
                    }
                },
            ),
            (
                "test@example.com",
                "shorttest",
                status.HTTP_400_BAD_REQUEST,
                {
                    "detail": {
                        "code": ErrorCode.REGISTER_INVALID_PASSWORD.value,
                        "reason": [
                            "Password should be at least 8 characters.",
                            "Password should contain at least one uppercase letter.",
                            "Password should contain at least one special character.",
                        ],
                    }
                },
            ),
        ],
    )
    @pytest.mark.asyncio(loop_scope="function")
    async def test_password_validation(
        self, test_client, email, password, expected_status, expected_detail
    ):
        """Test user registration with password validation."""
        json = {"email": email, "password": password}
        response = await test_client.post("/auth/register", json=json)

        assert response.status_code == expected_status

    @pytest.mark.asyncio(loop_scope="function")
    async def test_register_user_with_valid_password(self, test_client, db_session):
        """Test user registration with success"""
        json = {
            "email": "user@1.com",
            "password": "Sppecialchar1#",
        }
        response = await test_client.post("/auth/register", json=json)

        row = await db_session.execute(select(User))

        user = row.scalars().first()

        assert response.status_code == status.HTTP_201_CREATED
        assert user is not None
        assert user.email == "user@1.com"
