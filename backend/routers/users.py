from fastapi import APIRouter,Depends,  HTTPException, status
#from database import SessionLocal
import schemas 
from sqlalchemy.orm import Session
from database import get_db
import models
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#def verify_password(plain_password, hashed_password):
#   return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_by_email(email: str, db: Session = Depends(get_db)):
    return db.query(models.User).filter(models.User.email == email).first()

#create user route
@router.post("/users/", response_model= schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    hashed_pass = get_password_hash(user.password)
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(name= user.name, lastname= user.lastname, email=user.email, password = hashed_pass)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user