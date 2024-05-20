from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ContentType(Base):
    __tablename__ = "content_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    type_id = Column(Integer, ForeignKey("content_types.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)

#Muhamed Aletic
#Table needed for quiz realisation
class Quiz(Base):
    __tablename__ = "quizes"

    quiz_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    questions = relationship("Question", back_populates="quiz")

class Question(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    quiz_id = Column(Integer, ForeignKey("quizes.quiz_id", ondelete="CASCADE"), nullable=False)

    quiz = relationship("Quiz", back_populates="questions")
    answers = relationship("Answer", back_populates="question")

class Answer(Base):
    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.question_id", ondelete="CASCADE"), nullable=False)
    answer = Column(Text, nullable=False)
    status = Column(Boolean, nullable=False)

    question = relationship('Question', back_populates="answers")
 

 #Sarah Hodzic
 #Tables for Forum

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    likes = Column(Integer, default=0)
    post = Column(Text, nullable=False)

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    comment = Column(Text, nullable=False)
    likes = Column(Integer, default=0)

class PostLike(Base):
    __tablename__ = "post_likes"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)

class CommentLike(Base):
    __tablename__ = "comment_likes"

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    comment_id = Column(Integer, ForeignKey("comments.id", ondelete="CASCADE"), primary_key=True)