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




# class HelloRequest(BaseModel):
#     name: str
#
# async def log_request_body(request: Request):
#     # Log the HTTP method and URL
#     method = request.method
#     url = str(request.url)
#
#     # Log headers (some headers may contain sensitive data, be cautious)
#     headers = dict(request.headers)
#
#     # Log the raw request body
#     body = await request.body()
#
#     print(f"Request received: {method} {url}")
#     print(f"Headers: {json.dumps(headers, indent=2)}")
#     print(f"Body: {body.decode()}")  # Decoding to make it readable
#
#     return body
#
# @app.middleware("http")
# async def log_requests(request: Request, call_next):
#     # Log request details
#     body = await log_request_body(request)
#
#     # Call the next middleware or endpoint
#     response = await call_next(request)
#     return response
#
# @app.post("/hello", tags=["hello"])
# async def hello(request: HelloRequest, body: bytes = Depends(log_request_body)):
#     # The body is already printed by the dependency, so no need to print here again
#     return {"message": f"Hello {request.name}!"}
#