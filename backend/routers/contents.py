from fastapi import APIRouter,Depends
#from database import SessionLocal
import schemas 
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()




@router.get("/contents/", response_model=list[schemas.Content])
def read_contents(db: Session = Depends(get_db)):
    return db.query(models.Content).all()
   