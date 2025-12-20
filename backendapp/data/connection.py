import psycopg2
from config import Config

def get_conn():
    conn = psycopg2.connect(Config.DATABASE_URL)
    return conn

def put_conn(conn):
    try:
        print("commiting")
        conn.commit()
    except Exception as ex:
        print(f"exception {ex}")
        pass
    finally:
        conn.close()

def close_conn(conn):
    try:
        conn.close()
    except Exception:
        pass
