from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

def getDeepseekChatModel():
    llm = OpenAI(
            base_url= os.environ.get("BASE_URL"),
            api_key= os.environ.get("DEEPSEEK_API_KEY"),
        )
    return llm



