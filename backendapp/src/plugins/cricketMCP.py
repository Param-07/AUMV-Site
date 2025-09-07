import asyncio
import httpx
from mcp.server.fastmcp import FastMCP

BASE_URL = "https://cricbuzz-cricket.p.rapidapi.com"
API_KEY = "e7546815c3mshb8bef9659ede9f1p1a6533jsn7baffe40d684"

server = FastMCP("cricket-mcp")

# helper to call cricket API
async def fetch(endpoint: str, params: dict = None):
    print("Querying to MCP server - cricket")
    async with httpx.AsyncClient() as client:
        headers = {
            "accept": "application/json, text/event-stream",
            "content-Type": "application/json",
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com"
        }
        print(f"{BASE_URL}/{endpoint}")
        resp = await client.get(f"{BASE_URL}/{endpoint}", params=params, headers=headers)
        resp.raise_for_status()
        return resp.json()

# =============== MATCHES ===============
@server.tool()
async def live_matches():
    """Get all live matches"""
    return await fetch("matches/v1/live")

@server.tool()
async def upcoming_matches():
    """Get upcoming matches"""
    return await fetch("matches/v1/upcoming")

@server.tool()
async def recent_matches():
    """Get recently finished matches"""
    return await fetch("matches/v1/recent")

@server.tool()
async def match_info(match_id: str):
    """Get detailed info of a match"""
    return await fetch(f"mcenter/v1/{match_id}")

@server.tool()
async def match_scorecard(match_id: str):
    """Get scorecard of a match"""
    return await fetch(f"mcenter/v1/{match_id}/scard")

# =============== SERIES ===============
@server.tool()
async def get_schedule():
    """Get list of every matches scheduled around the globe"""
    return await fetch("schedule/v1/interational")

@server.tool()
async def list_series():
    """Get list of ongoing international series"""
    return await fetch("series/v1/international")

@server.tool()
async def series_matches(series_id: str):
    """Get matches of a series"""
    return await fetch(f"series/v1/{series_id}")

# =============== TEAMS ===============
@server.tool()
async def list_teams():
    """Get list of international teams"""
    return await fetch("teams/v1/international")

@server.tool()
async def team_players(team_id: str):
    """Get players of a team"""
    return await fetch(f"teams/v1/{team_id}")

# =============== PLAYERS ===============
@server.tool()
async def player_info(player_id: str):
    """Get info of a player"""
    return await fetch(f"players/v1/{player_id}")

@server.tool()
async def player_career(player_id: str):
    """Get career stats of a player, player_id here is a string of number which is unique for each player"""
    return await fetch(f"stats/v1/players/{player_id}/career")
# =============== NEWS ===============
@server.tool()
async def latest_news():
    """Get latest cricket news"""
    return await fetch("news/v1/index")

@server.tool()
async def news_detail(news_id: str):
    """Get detailed cricket news article"""
    return await fetch(f"news/v1/detail/{news_id}")

# =============== STATS ===============
@server.tool()
async def icc_rankings(format: str = "odi", category: str = "batsmen"):
    """Get ICC rankings by format (odi/test/t20) and category (batsmen/bowlers/teams)"""
    return await fetch(f"stats/v1/rankings/{format}/{category}")

# ✅ Run MCP Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(server.streamable_http_app(), host="127.0.0.1", port=5000)
