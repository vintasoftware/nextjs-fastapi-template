from fastapi import Depends, FastAPI, Request
from pydantic import BaseModel
import json

from .database import User
from .schemas import UserCreate, UserRead, UserUpdate
from .users import auth_backend, current_active_user, fastapi_users, AUTH_URL_PATH
from fastapi.middleware.cors import CORSMiddleware
from .utils import simple_generate_unique_route_id


app = FastAPI(generate_unique_id_function=simple_generate_unique_route_id)


origins = [
    # "http://localhost:3000",
    # "http://localhost:8080",
    "https://nextjs-fastapi-template-frontend.vercel.app"
]
#
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get("/authenticated-route", tags=["custom-auth"])
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}




class HelloRequest(BaseModel):
    name: str


# Custom dependency to print request body
async def log_request_body(request: Request):
    body = await request.body()  # Read the raw request body
    print(f"Request body: {body.decode()}")
    return body  # You can return it if needed for further processing

@app.post("/hello", tags=["hello"])
async def hello(request: HelloRequest, body: bytes = Depends(log_request_body)):
    # The body is already printed by the dependency, so no need to print here again
    return {"message": f"Hello {request.name}!"}
