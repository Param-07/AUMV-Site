from psycopg2 import pool
import os
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.environ.get("DB_URL")

connection_pool = pool.SimpleConnectionPool(
    1,
    10,
    dsn = DB_URL
)

def get_conn():
    return connection_pool.getconn()

def put_conn(conn):
    return connection_pool.putconn(conn)

def close_conn():
    connection_pool.closeall()