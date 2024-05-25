from pydantic import BaseModel, Field
#Muhamed Aletic
#Needed for late bainding
from typing import ForwardRef

class Role(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name : str
    lastname : str
    email : str
    role_id : int 


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class ContentBase(BaseModel):
    title: str
    content: str

class ContentCreate(ContentBase):
    pass

class Content(ContentBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

class MediaBase(BaseModel):
    name: str
    media_type: str
    media_url: str
    content_id: int

class MediaCreate(MediaBase):
    pass

class Media(MediaBase):
    id: int
    
    class Config:
        orm_mode = True

#Muhamed Aletic
#Schemas for creating and reading quizzes, including questions and answers.
#Quiz
class QuizBase(BaseModel):
    title: str

class QuizCreate(QuizBase):
    owner_id: int


question_ref = ForwardRef("Question")
class Quiz(QuizBase):
    quiz_id: int
    owner_id: int
    questions: list[question_ref] = []

    class Config:
        from_attributes = True

#Question
class QuestionBase(BaseModel):
    question: str

class QuestionCreate(QuestionBase):
    quiz_id: int

answer_ref = ForwardRef("Answer")
class Question(QuestionBase):
    question_id: int
    quiz_id: int
    answers: list[answer_ref] = []
    class Config:
        from_attributes = True

#Answer
class AnswerBase(BaseModel):
    answer: str

class AnswerCreate(AnswerBase):
    status: bool
    question_id: int

class Answer(AnswerBase):
    answer_id: int
    question_id: int
    answer: str
    status: bool

    class Config:
        from_attributes = True


#Sarah Hodzic
#Schemas for creating and returning posts and comments on said posts

class PostBase(BaseModel):
    post:str
    title: str

class Post(PostBase):
    id: int
    user_id: int
    likes: int
    class Config:
        from_attributes = True

class PostCreate(BaseModel):
    user_id: int
    title: str = Field(..., description="Post title", min_length= 1)
    post: str = Field(..., description="Post content", min_length= 1)

#Likes

class Like(BaseModel):
    user_id: int
    post_id: int
    

#Comments

class CommentBase(BaseModel):
    comment: str

class Comment(CommentBase):
    id: int
    post_id: int
    user_id: int
    likes: int
    class Config:
        from_attribues = True

class CommentCreate(BaseModel):
    comment: str = Field(..., description="Comment ", min_length= 1)
    user_id: int
    post_id: int