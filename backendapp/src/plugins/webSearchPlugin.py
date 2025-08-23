import os
from dotenv import load_dotenv
from semantic_kernel.functions import kernel_function
from tavily import TavilyClient


class WebSearchPlugin:
    def __init__(self):
        self.client = TavilyClient(
            api_key= os.environ.get("TAVILY_API_KEY")
        )
    @kernel_function(description="Use the tavily search for the data related to user query which the llm don't have" \
    "latest and most appropriate information about any general topics")
    def general_tavily_search(self, query: str):
        if not query or not query.strip():
            print("IAMHERE")
            return "No Queery Provided"
        print(f"QUERY --: {query}")
        result = self.client.search(query= query,
                                    time_range='month',
                                    max_results= 5,
                                    topic= 'general',
                                    include_answer= 'basic',
                                    include_domains=["https://en.wikipedia.org/wiki/Wikipedia"]
                                    )
        
        return result
    
    @kernel_function(description="Use the tavily search for the data related to query and the query is related to current affairs" \
    "and news around the globe")
    def news_tavily_search(self, query: str):
        if not query or not query.strip():
            print("IAMHERE")
            return "No Queery Provided"
        print(f"QUERY : {query}")
        result = self.client.search(query= query,
                                    time_range='year',
                                    max_results= 5,
                                    topic= 'news',
                                    include_answer= 'basic',
                                    include_domains=["https://www.bbc.com/news",
                                                     "https://www.thehindu.com/",
                                                     "https://www.washingtonpost.com/"]
                                    )
        
        return result