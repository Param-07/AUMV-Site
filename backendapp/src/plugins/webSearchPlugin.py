import os
from dotenv import load_dotenv
from semantic_kernel.functions import kernel_function
from tavily import TavilyClient


class WebSearchPlugin:
    def __init__(self):
        self.client = TavilyClient(
            api_key= os.environ.get("TAVILY_API_KEY")
        )
    @kernel_function(description="""Always search the web using Tavily to retrieve the most recent and relevant information 
                     for any user query. Use this to update or fact-check the LLM's knowledge with the latest 
                     available data.""")
    def general_tavily_search(self, query: str, time_range: str):
        if not query or not query.strip():
            return "No Queery Provided"
        print(f"QUERY --: {query}")
        result = self.client.search(query= query,
                                    time_range=f'{time_range}',
                                    max_results= 5,
                                    topic= 'general',
                                    include_answer= 'basic',
                                    )
        
        return result