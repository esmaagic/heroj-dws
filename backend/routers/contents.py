from fastapi import APIRouter,Depends
#from database import SessionLocal
import schemas 
from sqlalchemy.orm import Session
from database import get_db
import models
from routers.auth import get_current_user

router = APIRouter(tags =['contents'])




""" 
1. from routers.auth import get_current_user
2. proslijediti funkciji current_user: schemas.User = Depends(get_current_user) 
ako prodje funkcija znaci da je user logovan i mozete pristupit njegovom podacima putem current_user
ako nije logovan dobit cete odgovarajuci error response
pogledaj dummy rutu
"""
@router.get("/contents/", response_model=list[schemas.Content])
def read_contents(db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    return db.query(models.Content).all()

#dummy ruta
@router.get("/dummy/")
def read_contents(db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    return current_user

 