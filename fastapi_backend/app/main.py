from fastapi import FastAPI
from fastapi_pagination import add_pagination
from .schemas import UserCreate, UserRead, UserUpdate
from .users import auth_backend, fastapi_users, AUTH_URL_PATH
from fastapi.middleware.cors import CORSMiddleware
from .utils import simple_generate_unique_route_id
from app.routes.items import router as items_router
from app.config import settings

app = FastAPI(
    generate_unique_id_function=simple_generate_unique_route_id,
    openapi_url=settings.OPENAPI_URL,
)

# Middleware for CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include authentication and user management routes
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix=f"/{AUTH_URL_PATH}/jwt",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix=f"/{AUTH_URL_PATH}",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix=f"/{AUTH_URL_PATH}",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix=f"/{AUTH_URL_PATH}",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

# Include items routes
app.include_router(items_router, prefix="/items")
add_pagination(app)
