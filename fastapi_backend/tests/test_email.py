import pytest
from pathlib import Path
from fastapi_mail import ConnectionConfig, MessageSchema
from app.email import get_email_config, send_reset_password_email
from app.models import User


@pytest.fixture
def mock_settings(mocker):
    mock = mocker.patch("app.email.settings")
    # Set up mock settings with test values
    mock.MAIL_USERNAME = "test_user"
    mock.MAIL_PASSWORD = "test_pass"
    mock.MAIL_FROM = "test@example.com"
    mock.MAIL_PORT = 587
    mock.MAIL_SERVER = "smtp.test.com"
    mock.MAIL_FROM_NAME = "Test Sender"
    mock.MAIL_STARTTLS = True
    mock.MAIL_SSL_TLS = False
    mock.USE_CREDENTIALS = True
    mock.VALIDATE_CERTS = True
    mock.TEMPLATE_DIR = "email_templates"
    mock.FRONTEND_URL = "http://test-frontend.com"
    return mock


@pytest.fixture
def mock_user():
    return User(
        email="user@example.com",
    )


def test_get_email_config(mock_settings):
    config = get_email_config()

    assert isinstance(config, ConnectionConfig)
    assert config.MAIL_USERNAME == "test_user"
    assert config.MAIL_PASSWORD == "test_pass"
    assert config.MAIL_FROM == "test@example.com"
    assert config.MAIL_PORT == 587
    assert config.MAIL_SERVER == "smtp.test.com"
    assert config.MAIL_FROM_NAME == "Test Sender"
    assert config.MAIL_STARTTLS
    assert not config.MAIL_SSL_TLS
    assert config.USE_CREDENTIALS
    assert config.VALIDATE_CERTS
    assert isinstance(config.TEMPLATE_FOLDER, Path)


@pytest.mark.asyncio
async def test_send_reset_password_email(mock_settings, mock_user, mocker):
    # Mock FastMail
    mock_fastmail = mocker.patch("app.email.FastMail")
    mock_fastmail_instance = mock_fastmail.return_value
    mock_fastmail_instance.send_message = mocker.AsyncMock()

    # Test data
    test_token = "test-token-123"

    # Call the function
    await send_reset_password_email(mock_user, test_token)

    # Verify FastMail was instantiated with correct config
    mock_fastmail.assert_called_once()
    config_arg = mock_fastmail.call_args[0][0]
    assert isinstance(config_arg, ConnectionConfig)

    # Verify send_message was called
    mock_fastmail_instance.send_message.assert_called_once()

    # Verify the message schema
    message_arg = mock_fastmail_instance.send_message.call_args[0][0]
    assert isinstance(message_arg, MessageSchema)
    assert message_arg.subject == "Password recovery"
    assert message_arg.recipients == [mock_user.email]

    # Verify template body contains correct data
    expected_link = (
        f"http://test-frontend.com/password-recovery/confirm?token={test_token}"
    )
    assert message_arg.template_body == {
        "username": mock_user.email,
        "link": expected_link,
    }

    # Verify template name
    template_name = mock_fastmail_instance.send_message.call_args[1]["template_name"]
    assert template_name == "password_reset.html"
