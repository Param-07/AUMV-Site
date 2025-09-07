import requests
import os
from mcp.server.fastmcp import FastMCP
from requests_oauthlib import OAuth1
from dotenv import load_dotenv

load_dotenv()
server = FastMCP("Xmcp")
BASE_URL = os.environ.get("X_BASE_URL")

def auth_header():
    return {
        "Authorization": f"Bearer {os.environ.get("X_BEARER_TOKEN")}",
        "Content-Type": "application/json"
    }

@server.tool()
def post_tweets(text: str):
    """
    Post a new Tweet.
    """
    print("Querying to MCP server - X")
    url = f"{BASE_URL}/tweets"
    
    auth = OAuth1(
        os.getenv("X_API_KEY"),
        os.getenv("API_KEY_SECRET"),
        os.getenv("X_ACCESS_TOKEN"),
        os.getenv("X_TOKEN_SECRET")
    )

    payload = {"text": text}
    resp = requests.post(url, auth= auth, json=payload)

    if resp.status_code not in (200, 201):
        print(resp.json())
        return {"error": resp.json()}
    return resp.json()

@server.tool()
def delete_tweets(tweet_id: str):
    """
    Delete a Tweet by ID.
    """
    url = f"{BASE_URL}/tweets/{tweet_id}"
    auth = OAuth1(
        os.getenv("X_API_KEY"),
        os.getenv("API_KEY_SECRET"),
        os.getenv("X_ACCESS_TOKEN"),
        os.getenv("X_TOKEN_SECRET")
    )
    resp = requests.delete(url, auth=auth)

    if resp.status_code != 200:
        return {"error": resp.json()}
    return resp.json()

@server.tool()
def read_tweets_by_username(user_name: str):
    """
    Get the Tweets of a specific user.
    """
    url = f"{BASE_URL}/users/by/username/{user_name}"
    resp = requests.get(url, headers=auth_header())

    if resp.status_code != 200:
        return {"error": resp.json()}
    
    user_id = resp.json()["data"]["id"]

    url = f"{BASE_URL}/users/{user_id}/tweets"
    resp = requests.get(url, headers=auth_header())

    if resp.status_code != 200:
        return {"error": resp.json()}
    
    return resp.json()

@server.tool()
def read_tweets_by_id(tweet_id: list[str] | str):
    """
    Retrieve tweets by a single ID or a list of IDs.
    Example: "1841112641199234567"
    Example: ["1841112641199234567", "1842223456789000001"]
    """
    url = f"{BASE_URL}/tweet"

    if isinstance(tweet_id, str):
        tweet_id = [tweet_id]

    ids = ",".join(tweet_id)
    params = {"ids" : ids}

    resp = requests.get(url, headers=auth_header(), params=params)
    
    if resp.status_code != 200:
        return {"error": resp.json()}

    return resp.json()    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(server.streamable_http_app(), host="127.0.0.1", port=8001)