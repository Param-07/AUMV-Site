from semantic_kernel import Kernel
from semantic_kernel.agents import ChatCompletionAgent
from semantic_kernel.functions import kernel_function
from openai import OpenAI
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()
builder = Kernel()

class DateTimePlugin:
    @kernel_function(description="Get the current date and time both")
    def current_date_time(self):
        return datetime.now().isoformat()

    @kernel_function(description="Get today's date only")
    def today_date(self):
        return datetime.now().date().isoformat()

    @kernel_function(description="Get current time")
    def current_time(self):
        return datetime.now().time().isoformat()
    
pluginInstance = DateTimePlugin()
