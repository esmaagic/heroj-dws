from fastapi import APIRouter,Depends, HTTPException
import schemas 
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()

#get all posts
@router.get("/posts/", response_model=list[schemas.Post])
def get_all_posts(db: Session = Depends(get_db)):
 posts = db.query(models.Post).order_by(models.Post.likes.desc()).all()
 if not posts:
        raise HTTPException(status_code=404, detail="There are no posts created")
 return posts

#get post by id
# Dohvat pojedinačnog posta
@router.get("/posts/{post_id}", response_model=schemas.Post)
def get_post_by_id(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

#creating a new post
@router.post("/posts/")
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
 new_post = models.Post(title = post.title, post = post.post, user_id = post.user_id)
 if not new_post:
        raise HTTPException(status_code=404, detail="Post not inserted")
 db.add(new_post)
 db.commit()
 db.refresh(new_post)
 return new_post

#like increase of a post
@router.put("/posts/likes/")
def like_increase_post(post_info: schemas.Like, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_info.post_id).first()
    already_liked = db.query(models.PostLike).filter(models.PostLike.user_id == post_info.user_id, models.PostLike.post_id == post_info.post_id).first()
    if already_liked:
        raise HTTPException(status_code=400, detail="User already liked this post")
    post.likes = post.likes + 1
    db.commit()
    db.refresh(post)
    return post

#documenting a new like of a post
@router.post("/posts/like/")
def new_like_post(like: schemas.Like,  db: Session = Depends(get_db)):
    if db.query(models.PostLike).filter(models.PostLike.user_id == like.user_id, models.PostLike.post_id == like.post_id).first():
        raise HTTPException(status_code=400, detail="This user has already liked this post")
    new_like = models.PostLike(user_id = like.user_id, post_id = like.post_id)
    if not new_like:
        raise HTTPException(status_code=404, detail="Like not inserted")
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like


#creating new comment on a post
@router.post("/comments/")
def new_comment(comment_content: schemas.CommentCreate, db: Session = Depends(get_db)):
    new_comment = models.Comment(comment = comment_content.comment, post_id = comment_content.post_id, user_id = comment_content.user_id)
    if not new_comment:
        raise HTTPException(status_code=404, detail="Comment not inserted")
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

#getting all comments for a specific post
@router.get("/comments/{post_id}")
def get_all_comments_for_a_post(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(models.Comment).filter(models.Comment.post_id == post_id).order_by(models.Comment.likes.desc()).all()
    if not comments:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comments

#documenting a new like of a comment
@router.post("/comments/like/")
def new_like_comment(like: schemas.Like,  db: Session = Depends(get_db)):
    if db.query(models.CommentLike).filter(models.CommentLike.user_id == like.user_id, models.CommentLike.comment_id == like.post_id).first():
        raise HTTPException(status_code=400, detail="This user has already liked this post")
    new_like = models.CommentLike(user_id = like.user_id, comment_id = like.post_id)
    if not new_like:
        raise HTTPException(status_code=404, detail="Like not inserted")
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like

#like increase of a comment
@router.put("/comments/likes/")
def like_increase_comment(comment_info: schemas.Like, db: Session = Depends(get_db)):
    comment = db.query(models.Comment).filter(models.Comment.id == comment_info.post_id).first()
    already_liked = db.query(models.CommentLike).filter(models.CommentLike.user_id == comment_info.user_id, models.CommentLike.comment_id == comment_info.post_id).first()
    if already_liked:
        raise HTTPException(status_code=400, detail="User already liked this post")
    comment.likes = comment.likes + 1
    db.commit()
    db.refresh(comment)
    return comment
