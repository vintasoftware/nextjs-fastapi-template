from uuid import UUID

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .database import User, get_async_session
from .models import Item
from .schemas import UserCreate, UserRead, UserUpdate, ItemRead, ItemCreate
from .users import auth_backend, current_active_user, fastapi_users, AUTH_URL_PATH
from fastapi.middleware.cors import CORSMiddleware
from .utils import simple_generate_unique_route_id
from sqlalchemy.future import select


app = FastAPI(generate_unique_id_function=simple_generate_unique_route_id)


origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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


@app.get("/items/", tags=["item"], response_model=list[ItemRead])
async def read_item(
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await db.execute(select(Item).filter(Item.user_id == user.id))
    items = result.scalars().all()
    return [ItemRead.from_orm(item) for item in items]


@app.post("/items/", tags=["item"], response_model=ItemRead)
async def create_item(
    item: ItemCreate,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    db_item = Item(**item.model_dump(), user_id=user.id)
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item


@app.delete("/items/{item_id}", tags=["item"])
async def delete_item(
    item_id: UUID,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await db.execute(
        select(Item).filter(Item.id == item_id, Item.user_id == user.id)
    )
    item = result.scalars().first()

    if not item:
        raise HTTPException(status_code=404, detail="Item not found or not authorized")

    await db.delete(item)
    await db.commit()

    return {"message": "Item successfully deleted"}
