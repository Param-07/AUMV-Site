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
        cur.execute(f"""SELECT * FROM "{table_name}";""")
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


def insert_video(url, name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO videos (video_url, title) VALUES (%s, %s) RETURNING *;", (url, name))
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


def delete_video(id, bucket_name):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM videos WHERE id=%s RETURNING *;", (id,))
        row = cur.fetchone()
        remove_file_from_storage(bucket_name, [row["video_url"]])
        return row
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


def insert_achiever(name, image_url, year, _class, _percentage, board, branch):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO achievers (name, photo, year, class, percentage, board, branch) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s) RETURNING *;",
            (name, image_url, year, _class, _percentage, board, branch)
        )
        return cur.fetchone()
    finally:
        put_conn(conn)


def update_achiever(id, name, image_url, year, _class, _percentage, img_updated, bucket_name, board, branch):
    conn = get_conn()
    try:
        cur = conn.cursor()
        if img_updated:
            cur.execute("SELECT photo FROM achievers WHERE id=%s;", (id,))
            data = cur.fetchone()
            remove_file_from_storage(bucket_name, [data["photo"]])

        cur.execute(
            "UPDATE achievers SET name=%s, photo=%s, year=%s, class=%s, percentage=%s, board=%s, branch=%s "
            "WHERE id=%s RETURNING *;",
            (name, image_url, year, _class, _percentage, board, branch, id)
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

def addAdmissionInfo(studentName, dob, gender, admissionClass, address, fatherName, fatherOccupation, fatherPhone,
                     motherName, motherOccupation, motherPhone, previousschool, board, percentage, agreeTerms, isCompleted):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("""INSERT INTO applications ("studentName", dob, gender, "admissionClass", address, "fatherName", "fatherOccupation", "fatherPhone",
                     "motherName", "motherOccupation", "motherPhone", "previousSchool", board, percentage, "agreeTerms", "isCompleted") VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);""", 
                    (studentName, dob, gender, admissionClass, address, fatherName, fatherOccupation, fatherPhone,
                     motherName, motherOccupation, motherPhone, previousschool, board, percentage, agreeTerms, isCompleted))
        return "Application recieved"
    except Exception as exc:
        return (str(exc))
    finally:
        put_conn(conn)

def addInquiryInfo(name, contact, subject, message, isCompleted):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("""INSERT INTO "inquiryData" (name, contact, subject, message, "isCompleted") VALUES
                    (%s, %s, %s, %s, %s);""", (name, contact, subject, message, isCompleted))
        return "Inquiry recieved"
    except Exception as exc:
        return str(exc)
    finally:
        put_conn(conn)

def addVisitInfo(visitorName, contactNumber, guests, visitDate, visitSlot, isCompleted):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("""INSERT into "campusVisit" ("visitorName", "contactNumber", guests, "visitDate", "visitSlot", "isCompleted")
                    VALUES (%s, %s, %s, %s, %s, %s);""", (visitorName, contactNumber, guests, visitDate, visitSlot, isCompleted))
        return "Visit recieved"
    except Exception as exc:
        return str(exc)
    finally:
        put_conn(conn)

def markAsReadFormData(id, tableName):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(
            f'UPDATE "{tableName}" SET "isCompleted" = %s WHERE id = %s RETURNING *;',
            (True, id)
        )
        return cur.fetchone()
    except Exception as exc:
        print(str(exc))
    finally:
        put_conn(conn)

def deleteFormData(id, tableName):
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(f"""DELETE FROM "{tableName}" WHERE id=%s;""", (id,))
        return "Deleted successfully"
    except Exception as exc:
        print(str(exc))
    finally:
        put_conn(conn)