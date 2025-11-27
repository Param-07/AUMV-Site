from data.connection import get_conn, put_conn
from psycopg2.extras import RealDictCursor

def _fetch_one(email):
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT username, email, password FROM admin_table WHERE email = %s;", (email,))
        return cur.fetchone()
    # except Exception as e:
        # raise DatabaseError(str(e)) if "DatabaseError" in globals() else Exception(str(e))
    finally:
        if conn:
            put_conn(conn)
def fetch_all(table_name):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM {table_name};")
    rows = cur.fetchall()
    put_conn(conn)
    return rows

def fetch_by_id(table_name, id):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(f"SELECT * FROM {table_name} WHERE id = %s;", (id,))
    row = cur.fetchone()
    put_conn(conn)
    return row

def insert_event(title, valid_till, description):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("INSERT INTO events (title, valid_till, description) VALUES (%s, %s, %s) RETURNING *;",
                (title, valid_till, description))
    inserted = cur.fetchone()
    put_conn(conn)
    return inserted

def update_event(id, title, valid_till, description):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("UPDATE events SET title=%s, valid_till=%s, description=%s WHERE id=%s RETURNING *;",
                (title, valid_till, description, id))
    updated = cur.fetchone()
    put_conn(conn)
    return updated

def delete_event(id):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM events WHERE id=%s;", (id,))
    put_conn(conn)
    return True

def insert_teacher(name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(
        "INSERT INTO teachers (name,email,subject,joining_date,phone_num,address,dob,photo_url,resume_url) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *;",
        (name,email,subject,joining_date,phone_num,address,dob,photo_url,resume_url)
    )
    row = cur.fetchone()
    put_conn(conn)
    return row

def update_teacher(id, name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(
        "UPDATE teachers SET name=%s,email=%s,subject=%s,joining_date=%s,phone_num=%s,address=%s,dob=%s,photo_url=%s,resume_url=%s WHERE id=%s RETURNING *;",
        (name,email,subject,joining_date,phone_num,address,dob,photo_url,resume_url,id)
    )
    row = cur.fetchone()
    put_conn(conn)
    return row

def delete_teacher(id):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM teachers WHERE id=%s;", (id,))
    put_conn(conn)
    return True

def insert_gallery(event_name, description, url):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("INSERT INTO gallery (event_name, description, url) VALUES (%s,%s,%s) RETURNING *;",
                (event_name, description, url))
    row = cur.fetchone()
    put_conn(conn)
    return row

def delete_gallery(id):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("DELETE FROM gallery WHERE id=%s;", (id,))
    put_conn(conn)
    return True

def fetch_gallery_grouped():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT get_gallery_grouped();")
    row = cur.fetchone()
    put_conn(conn)
    return row[0]

def insert_video(url):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("INSERT INTO videos (url) VALUES (%s) RETURNING *;", (url,))
    row = cur.fetchone()
    put_conn(conn)
    return row
