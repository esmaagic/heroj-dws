#routers fajl
from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session
import models, schemas
from sqlalchemy.orm import joinedload

from database import get_db



router = APIRouter(tags =['quiz'])


#Muhamed Aletic
#My work after internship

# Get all quizzes from database
@router.get("/quizzes")
async def get_quizzes(db: Session = Depends(get_db)):
    
    quizzes = db.query(models.Quiz).all()
    return quizzes


# Find quiz by id   
@router.get("/quiz/find-quiz/{quiz_id}")
async def find_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(models.Quiz).filter(models.Quiz.quiz_id == quiz_id).options(joinedload(models.Quiz.questions)).first()
    if not quiz:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quiz not found")
    for question in quiz.questions:
        db.refresh(question)
        question.answers = db.query(models.Answer).filter(models.Answer.question_id == question.question_id).all()
    return quiz

# Route for create quiz
@router.post("/create-quiz")
async def create_quiz(quiz: schemas.QuizCreate, db: Session = Depends(get_db)):
    db_quiz = models.Quiz(**quiz.model_dump())
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)
    return db_quiz

# Route for create question
@router.post("/create-question")
async def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    db_question = models.Question(**question.model_dump())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

# Route for create answer
@router.post("/create-answer")
async def create_answer(answer: schemas.AnswerCreate, db: Session = Depends(get_db)):
    db_answer = models.Answer(**answer.model_dump())
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

# Route for creating a category
@router.post("/quiz/create-category")
def create_category(category: schemas.QuizCategoryCreate, db: Session = Depends(get_db)):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Get all quizzes category from database
@router.get("/quiz/categories")
async def get_quiz_categories(db: Session = Depends(get_db)):
    
    db_quiz_catgeories = db.query(models.Category).all()
    return db_quiz_catgeories