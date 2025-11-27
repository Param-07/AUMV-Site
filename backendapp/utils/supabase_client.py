from supabase import create_client
from config import Config
client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
