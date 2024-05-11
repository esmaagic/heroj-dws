from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

# NADAM  se da je ovo dovoljno komentara Esmaaa hahahahah
router = APIRouter()

# Loading environment variables from .env file
load_dotenv()

# Reading the API key from the environment variables
api_key = os.getenv("API_KEY")

# Initializing the OpenAI client with our API key
client = OpenAI(api_key=api_key)

class SearchQuery(BaseModel):
    query: str

chat_log = [] 


# Sending a request to the OpenAI API using the Python library
def get_openai_response(query: str) -> str:
    global chat_log
    chat_log.append({"role": "user", "content": query})
    response = client.chat.completions.create(
        model="gpt-3.5-turbo", # Can specify the ID of the model we use (TREBALO MI JE SAMO CITAV JEDAN DAN DA OVO SKONTAM...)
        messages=chat_log, # List of messages, keeping track of the convo so far
        temperature=0, # Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
        max_tokens=200, # The maximum number of tokens that can be generated (we are being cheap hehehehe).
        # There are many many more, this sufices for our purposes lets gooooooo!!
    )
    assistant_response = response.choices[0].message.content
    chat_log.append({"role": "assistant", "content": assistant_response})
    return assistant_response

# Route for the above request
@router.post("/first-aid/search")
async def search_first_aid(query: SearchQuery):
    openai_response = get_openai_response(query.query)
    return {"query": query.query, "response": openai_response}
