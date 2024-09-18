from sqlalchemy.orm.session import Session
from passlib.context import CryptContext

from .models import User
from .schemas import UserCreate


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_new_user(request: UserCreate, db: Session):
    new_user = User(
        name=request.name,
        email=request.email,
        hashed_password=pwd_context.hash(request.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user