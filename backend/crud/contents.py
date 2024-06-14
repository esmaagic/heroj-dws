from sqlalchemy.orm import Session,joinedload
import models, schemas
from fastapi import HTTPException
import os
from uuid import uuid4
UPLOAD_DIR = os.path.join("..", "frontend", "public")

os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    posts = db.query(models.Content).options(
        joinedload(models.Content.user),  # Eager load the user details
        joinedload(models.Content.sections).joinedload(models.Section.media) # Eager load one media for each section
    ).offset(skip).limit(limit).all()

    post_data = []
    for post in posts:
        user_details = {
            "id": post.user.id,
            "name": post.user.name,
            "email": post.user.email
        }
        media_url = "default-cover.jpg"
        for section in post.sections:
            if section.media:
                media_url =  os.path.basename(section.media[0].media_url)
                break  # Only need one media, so break after finding one
        post_data.append({
            "id": post.id,
            "title": post.title,
            "user": user_details,
            "created_at": post.created_at,
            "media_url": media_url
        })

    return post_data


def get_post_by_id(db: Session, post_id: int):
    post = db.query(models.Content).filter(models.Content.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    content = db.query(models.Content).filter(models.Content.id == content_id).first()

    if not content:
        return None  # Content not found

    for section in content.sections:
        if section.media:
            return section.media[0]  # Return the first media

    return post 


""" 
def create_post(db: Session, post: schemas.ContentCreate):
    db_post = models.Content(title=post.title, user_id=post.user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    for section in post.sections:
        db_section = models.Section(
            title=section.title,
            paragraph=section.content,
            content_id=db_post.id
        )
        print(db_section)
        db.add(db_section)
        db.commit()
        db.refresh(db_section)

        
        db_media = models.Media(
            name=section.media.name,
            media_url=section.media.media_url,
            section_id=db_section.id
        )
        db.add(db_media)
        db.commit()
        db.refresh(db_media)
    return db_post

 """


""" 
def create_media(db: Session, section_id: int, media_url: str, name: str):
    db_media = models.Media(section_id=section_id, media_url=media_url, name=name)
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media """


def create_post(db: Session, post: schemas.ContentCreate):
    try:
        db_post = models.Content(title=post.title, user_id=post.user_id)
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    except Exception as e:
        db.rollback()
        raise e

def create_section(db: Session, content_id: int, section: schemas.SectionCreate):
    try:
        db_section = models.Section(
            title=section.title,
            paragraph=section.content,
            content_id=content_id
        )
        db.add(db_section)
        db.commit()
        db.refresh(db_section)
    except Exception as e:
        db.rollback()
        raise e


def create_media(db: Session, section_id: int, media_url: str, name: str):
    try:
        db_media = models.Media(section_id=section_id, media_url=media_url, name=name)
        db.add(db_media)
        db.commit()
        db.refresh(db_media)
        return db_media
    except Exception as e:
        db.rollback()
        raise e
