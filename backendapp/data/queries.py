from utils.file_utils import remove_file_from_storage
from data.connection import get_conn, put_conn


def _fetch_one(email):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT username, email, password FROM admin_table WHERE email = %s;", (email,))
        return cur.fetchone()
    finally:
        put_conn(conn)


def fetch_all(table_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(f"SELECT * FROM {table_name};")
        return cur.fetchall()
    finally:
        put_conn(conn)


def fetch_by_id(table_name, id):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(f"SELECT * FROM {table_name} WHERE id = %s;", (id,))
        return cur.fetchone()
    finally:
        put_conn(conn)


def insert_event(title, valid_till, description):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO events (title, valid_till, description) VALUES (%s, %s, %s) RETURNING *;",
            (title, valid_till, description)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def update_event(id, title, valid_till, description):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(
            "UPDATE events SET title=%s, valid_till=%s, description=%s WHERE id=%s RETURNING *;",
            (title, valid_till, description, id)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def delete_event(id):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM events WHERE id=%s;", (id,))
        return True
    finally:
        put_conn(conn)


def insert_teacher(name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO teachers (name,email,subject,joining_date,phone_num,address,dob,photo,resume) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *;",
            (name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def update_teacher(id, name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url, photo_updated, resume_updated, bucket_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT photo, resume FROM teachers WHERE id=%s;", (id,))
        data = cur.fetchone()

        files = []
        if photo_updated:
            files.append(data["photo"])
        if resume_updated:
            files.append(data["resume"])
        if files:
            remove_file_from_storage(bucket_name, files)

        cur.execute(
            "UPDATE teachers SET name=%s,email=%s,subject=%s,joining_date=%s,phone_num=%s,address=%s,dob=%s,photo=%s,resume=%s "
            "WHERE id=%s RETURNING *;",
            (name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url, id)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def delete_teacher(id, bucket_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM teachers WHERE id=%s RETURNING *;", (id,))
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row["photo"], row["resume"]])
        return True
    finally:
        put_conn(conn)


def insert_gallery(event_name, description, url):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO files (category, description, file_url) VALUES (%s,%s,%s) RETURNING *;",
            (event_name, description, url)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def delete_gallery(bucket_name, id):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM files WHERE id=%s RETURNING *;", (id,))
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row["file_url"]])
        return True
    finally:
        put_conn(conn)


def fetch_gallery_grouped():
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT get_gallery_grouped();")
        return cur.fetchone()
    finally:
        put_conn(conn)


def fetch_categories():
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT get_unique_event_names();")
        return cur.fetchone()
    finally:
        put_conn(conn)


def insert_video(url):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO videos (video_url) VALUES (%s) RETURNING *;", (url,))
        return cur.fetchone()
    finally:
        put_conn(conn)


def insert_facilities(category, photo):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO facilities (category, photo) VALUES (%s,%s) RETURNING *;", (category, photo))
        return cur.fetchone()
    finally:
        put_conn(conn)


def delete_facilities(bucket_name, id):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM facilities WHERE id=%s RETURNING *;", (id,))
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row["photo"]])
        return True
    finally:
        put_conn(conn)


def delete_video(id):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM videos WHERE id=%s RETURNING *;", (id,))
        return cur.fetchone()
    finally:
        put_conn(conn)


def get_facilities():
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT get_facilities_grouped();")
        return cur.fetchone()
    finally:
        put_conn(conn)


def insert_achiever(name, description, image_url, level, year, _class, _percentage, _type, rank):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO achievers (name, description, photo, type, class, percentage, year, level, rank) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *;",
            (name, description, image_url, _type, _class, _percentage, year, level, rank)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def update_achiever(id, name, description, image_url, level, year, _class, _percentage, _type, rank, img_updated, bucket_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        if img_updated:
            cur.execute("SELECT photo FROM achievers WHERE id=%s;", (id,))
            data = cur.fetchone()
            remove_file_from_storage(bucket_name, [data["photo"]])

        cur.execute(
            "UPDATE achievers SET name=%s, description=%s, photo=%s, type=%s, class=%s, percentage=%s, year=%s, level=%s, rank=%s "
            "WHERE id=%s RETURNING *;",
            (name, description, image_url, _type, _class, _percentage, year, level, rank, id)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def delete_achiever(id, bucket_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM achievers WHERE id=%s RETURNING *;", (id,))
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row["photo"]])
        return row
    finally:
        put_conn(conn)


def insert_hero(category, image_url):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO hero_table (category, url) VALUES (%s,%s) RETURNING *;", (category, image_url))
        return cur.fetchone()
    finally:
        put_conn(conn)


def update_hero(id, category, image_url, img_updated, bucket_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        if img_updated:
            cur.execute("SELECT url FROM hero_table WHERE id=%s;", (id,))
            data = cur.fetchone()
            remove_file_from_storage(bucket_name, [data["url"]])

        cur.execute(
            "UPDATE hero_table SET category=%s, url=%s WHERE id=%s RETURNING *;",
            (category, image_url, id)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def delete_hero(id, bucket_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM hero_table WHERE id=%s RETURNING *;", (id,))
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row["url"]])
        return row
    finally:
        put_conn(conn)
