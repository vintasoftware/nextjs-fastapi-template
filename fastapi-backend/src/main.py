from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .schemas import UserCreate, User
from .user_db import create_new_user


Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/users", response_model=User)
async def create_user(request: UserCreate, db: Session = Depends(get_db)):
    return create_new_user(request, db)