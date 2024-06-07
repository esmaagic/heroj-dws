import os
from fastapi import APIRouter,Depends, File, HTTPException, UploadFile
#from database import SessionLocal
import schemas 
from sqlalchemy.orm import Session
from database import get_db
import models
from routers.auth import get_current_user
import crud.contents as crud
from uuid import uuid4

router = APIRouter(tags =['contents'])
UPLOAD_DIR = "uploads"



""" 
1. from routers.auth import get_current_user
2. proslijediti funkciji current_user: schemas.User = Depends(get_current_user) 
ako prodje funkcija znaci da je user logovan i mozete pristupit njegovom podacima putem current_user
ako nije logovan dobit cete odgovarajuci error response
pogledaj dummy rutu
"""

@router.get("/contents/{content_id}")
def read_post(content_id: int, db: Session = Depends(get_db)):
    content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    return content


@router.get("/contents/")
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts

@router.post("/contents/", response_model=schemas.Content)
def create_post(post: schemas.ContentCreate, db: Session = Depends(get_db)):
    return crud.create_post(db=db, post=post)



@router.post("/upload/", response_model=schemas.Media)
async def upload_file(name: str, section_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_extension = os.path.splitext(file.filename)[1]
    file_name = f"{uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    media_url = f"/{UPLOAD_DIR}/{file_name}"

    # Save the file to the file system
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    try:
        # Attempt to create the media entry in the database
        media = crud.create_media(db=db, section_id=section_id, media_url=media_url, name=name)
    except Exception as e:
        # If there is an error, delete the saved file and raise an HTTP exception
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"An error occurred while saving the media to the database: {str(e)}")
    return media
























"""  
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

"""