from typing import AsyncGenerator

from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from .config import settings
from .models import Base, User

engine = create_async_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # 1. Validates connections before use
    pool_size=1,  # 2. Maximum number of permanent connections
    max_overflow=0,  # 3. Maximum number of additional connections
    pool_recycle=1800,  # 4. Maximum age of a connection in seconds
    echo=False,
)

async_session_maker = async_sessionmaker(
    engine, expire_on_commit=settings.EXPIRE_ON_COMMIT
)


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)
