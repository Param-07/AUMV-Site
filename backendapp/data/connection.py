import psycopg2
from config import Config

def get_conn():
    conn = psycopg2.connect(Config.DATABASE_URL)
    return conn

def put_conn(conn):
    try:
        conn.commit()
    except Exception:
        pass
    finally:
        conn.close()

def close_conn(conn):
    try:
        conn.close()
    except Exception:
        pass
