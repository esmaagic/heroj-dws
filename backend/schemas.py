from pydantic import BaseModel
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
    role_id : int = 1


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class ContentBase(BaseModel):
    title: str

class Content(ContentBase):
    id: int
    type_id: int
    content: str
    class Config:
        from_attributes = True


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