import os
from fastapi import APIRouter,Depends, File, HTTPException, UploadFile
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


@router.get("/{content_id}", response_model=schemas.Content)
def get_content_by_id(content_id: int, db: Session = Depends(get_db)):
    content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content

@router.get("/{content_id}/media", response_model=list[schemas.Media])
def get_media_by_content_id(content_id: int, db: Session = Depends(get_db)):
   content = db.query(models.Content).filter(models.Content.id == content_id).first()
   return content.media


@router.get("/{content_id}", response_model=schemas.Content)
def get_content_by_id(content_id: int, db: Session = Depends(get_db)):
    content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content


#dummy ruta
@router.get("/dummy/")
def read_contents(db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    return current_user

@router.post("/create", response_model = schemas.Content)
def create_content(content: schemas.ContentCreate, db: Session = Depends(get_db),current_user: schemas.User = Depends(get_current_user)):
    if current_user.role_id != 2:
        raise HTTPException(status_code=403, detail="Permission denied")
    db_content = models.Content(**content.model_dump(), user_id=current_user.id)
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content


@router.post("/{content_id}/media/", response_model=schemas.Media)
def add_media_to_content(media_name:str, content_id: int, type: str,media: UploadFile = File(...), db: Session = Depends(get_db),current_user: schemas.User = Depends(get_current_user)):
    if current_user.role_id != 2:
        raise HTTPException(status_code=403, detail="Permission denied")
    # Check if the post exists
    db_content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if not db_content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    upload_folder = os.path.join(os.getcwd(), "resources")
    os.makedirs(upload_folder, exist_ok=True)
    
    # Define the path for the uploaded file
    file_path = os.path.join(upload_folder, media.filename)
    
    # Save the uploaded file to the specified directory
    with open(file_path, "wb") as f:
        contents = media.file.read()
        f.write(contents)
    
    # Create a new Media instance and associate it with the post
    db_media = models.Media(name=media_name, media_type=type, media_url=media.filename, content_id=content_id)
    
    # Add the new media instance to the session and commit changes to the database
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    
    return db_media