#pip install fastapi
#pip install "uvicorn[standard]"
#pip install pydantic
#pip install sqlalchemy
#pip install "python-jose[cryptography]"
#pip install "passlib[bcrypt]"

#pip install openai
#pip install python-dotenv

from fastapi import FastAPI

from routers import contents, auth, ai
import models
from database import engine 

#creates the tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    prefix = '/api',
    tags =['api']
)


app.include_router(contents.router)
app.include_router(auth.router)
app.include_router(ai.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}

