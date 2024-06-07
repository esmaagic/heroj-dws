from sqlalchemy.orm import Session
import models, schemas
from fastapi import HTTPException


def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Content).offset(skip).limit(limit).all()


def get_post_by_id(db: Session, post_id: int):
    post = db.query(models.Content).filter(models.Content.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    return post



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
        db.add(db_section)
        db.commit()
        db.refresh(db_section)
    return db_post


def create_media(db: Session, section_id: int, media_url: str, name: str):
    db_media = models.Media(section_id=section_id, media_url=media_url, name=name)
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media
