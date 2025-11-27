import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    ENV = os.getenv("FLASK_ENV", "development")
    DEBUG = ENV == "development"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    DATABASE_URL = os.getenv("DATABASE_URL")
    UPLOAD_TEMP_DIR = os.getenv("UPLOAD_TEMP_DIR", "./tmp")
