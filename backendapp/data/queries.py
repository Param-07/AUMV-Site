from os import name
from utils.file_utils import remove_file_from_storage
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
        "INSERT INTO teachers (name,email,subject,joining_date,phone_num,address,dob,photo,resume) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *;",
        (name,email,subject,joining_date,phone_num,address,dob,photo_url,resume_url)
    )
    row = cur.fetchone()
    put_conn(conn)
    print(row)
    return row

def update_teacher(id, name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url, photo_updated, resume_updated, bucket_name):
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT photo, resume from teachers where id=%s ;",
            (id,))
        data = cur.fetchone()
        files_to_remove = []
        if photo_updated:
            files_to_remove.append(data['photo'])
        if resume_updated:
            files_to_remove.append(data['resume'])
        
        if len(files_to_remove) > 0:
            remove_file_from_storage(bucket_name, files_to_remove)

        cur.execute(
            "UPDATE teachers SET name=%s,email=%s,subject=%s,joining_date=%s,phone_num=%s,address=%s,dob=%s,photo=%s,resume=%s WHERE id=%s RETURNING *;",
            (name,email,subject,joining_date,phone_num,address,dob,photo_url,resume_url,id)
        )
        row = cur.fetchone()
        put_conn(conn)
        return row
    except Exception as ex:
        print(f"herr {str(ex)}")

def delete_teacher(id, bucket_name):
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("DELETE FROM teachers WHERE id=%s RETURNING *;", (id,))
        removed_row = cur.fetchone()
        remove_file_from_storage(bucket_name, [removed_row['photo'], removed_row['resume']])
        put_conn(conn)
        return True
    except Exception as ex:
        print(f"Herereree {str(ex)}")

def insert_gallery(event_name, description, url):
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("INSERT INTO files (category, description, file_url) VALUES (%s,%s,%s) RETURNING *;",
                    (event_name, description, url))
        row = cur.fetchone()
        put_conn(conn)
        return row
    except Exception as ex:
        print(f"Hrereertrr {str(ex)}")

def delete_gallery( bucket_name, id):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("DELETE FROM files WHERE id=%s RETURNING *;", (id,))
    row = cur.fetchone()
    remove_file_from_storage( bucket_name, [row['file_url']])
    put_conn(conn)
    return True

def fetch_gallery_grouped():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT get_gallery_grouped();")
    row = cur.fetchone()
    put_conn(conn)
    return row[0]

def fetch_categories():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT get_unique_event_names();")
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

def insert_facilities(category, photo):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("INSERT INTO facilities (category, photo) VALUES (%s,%s) RETURNING *;",
                (category, photo))
    row = cur.fetchone()
    put_conn(conn)
    return row

def delete_facilities(bucket_name, id):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("DELETE FROM facilities WHERE id=%s RETURNING *;", (id,))
    row = cur.fetchone()
    remove_file_from_storage(bucket_name, [row['photo']])
    put_conn(conn)
    return True

def delete_video(id):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute("DELETE FROM videos WHERE id=%s RETURNING *;", (id,))
    row = cur.fetchone()
    put_conn(conn)
    return row

def get_facilities():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT get_facilities_grouped();")
    row = cur.fetchone()
    put_conn(conn)
    print(row[0])
    return row[0]


def insert_achiever(name, description, image_url, level, year, _class, _percentage, _type, rank):
    try:
        conn = get_conn()
        print(_class)
        print(_type)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("INSERT INTO achievers (name, description, photo, type, class,percentage, year, level, rank) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *;",
                    (name, description, image_url, _type, _class, _percentage, year, level, rank))
        row = cur.fetchone()
        put_conn(conn)
        return row
    except Exception as ex:
        print(str(ex))

def update_achiever(id, name, description, image_url, level, year, _class, _percentage, _type, rank, img_updated, bucket_name):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    if img_updated:
        cur.execute("SELECT photo from achievers where id=%s ;",
                    (id,))
        data = cur.fetchone()
        remove_file_from_storage(bucket_name, [data["photo"]])

    cur.execute("UPDATE achievers SET name=%s, description=%s, photo=%s, type=%s, class=%s, percentage=%s, year=%s, level=%s, rank=%s WHERE id=%s RETURNING *;",
                (name, description, image_url, _type, _class, _percentage, year, level, rank, id))
    row = cur.fetchone()
    put_conn(conn)
    return row

def delete_achiever(id, bucket_name):
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("DELETE FROM achievers WHERE id=%s RETURNING *;", (id,) )
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row['photo']])
        put_conn(conn)
        return row
    except Exception as ex:
        print(f"here -- {str(ex)}")

def insert_hero(category, image_url):
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("INSERT INTO hero_table (category, url) VALUES (%s,%s) RETURNING *;",
                    (category, image_url))
        row = cur.fetchone()
        put_conn(conn)
        return row
    except Exception as ex:
        print(str(ex))

def update_hero(id, category, image_url, img_updated, bucket_name):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    if img_updated:
        cur.execute("SELECT photo from hero_table where id=%s ;",
                    (id,))
        data = cur.fetchone()
        remove_file_from_storage(bucket_name, [data["url"]])

    cur.execute("UPDATE hero_table SET category=%s, url=%s WHERE id=%s RETURNING *;",
                (category, image_url, id))
    row = cur.fetchone()
    put_conn(conn)
    return row

def delete_hero(id, bucket_name):
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("DELETE FROM hero_table WHERE id=%s RETURNING *;", (id,) )
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row['url']])
        put_conn(conn)
        return row
    except Exception as ex:
        print(f"here -- {str(ex)}")