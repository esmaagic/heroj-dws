from openai import OpenAI
from dotenv import load_dotenv
import os

# Loading environment variables from .env file
load_dotenv()

# Reading the API key from the environment variables
api_key = os.getenv("API_KEY")

# Initializing the OpenAI client with our API key
client = OpenAI(api_key=api_key)

response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
         {"role": "user", "content": "List top 5 anime of all time"}
    ]
)
print(response)
