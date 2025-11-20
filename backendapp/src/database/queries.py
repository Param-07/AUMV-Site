from audioop import add
from datetime import date
from fileinput import filename
import numbers
import os
from typing import List
from postgrest.base_request_builder import APIResponse
from supabase._sync.client import SyncClient
from werkzeug.datastructures import FileStorage
from utils.errors import DatabaseError
from database.connection import get_conn, put_conn
from psycopg2.extras import RealDictCursor
from werkzeug.utils import secure_filename

def _fetch_one(email):
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT username, email, password FROM admin_table WHERE email = %s;", (email,))
        return cur.fetchone()
    except Exception as e:
        raise DatabaseError(str(e)) if "DatabaseError" in globals() else Exception(str(e))
    finally:
        if conn:
            put_conn(conn)

def _fetch_all(query, params=()):
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(query, params)
        return cur.fetchall()
    except Exception as e:
        raise DatabaseError(str(e)) if "DatabaseError" in globals() else Exception(str(e))
    finally:
        if conn:
            put_conn(conn)

def _execute_and_return(username, email, hashed):
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            INSERT INTO admin_table (username, password, email)
            VALUES (%s, %s, %s)
            RETURNING id, username, email;
            """,
            (username, hashed, email)
        )
        row = cur.fetchone()
        conn.commit()
        return row
    except Exception as e:
        if conn:
            conn.rollback()
        raise DatabaseError(str(e)) if "DatabaseError" in globals() else Exception(str(e))
    finally:
        if conn:
            put_conn(conn)

def get_login(email):
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute('SELECT username, password FROM "Admin Table" WHERE email = %s', (email,))
        user = cur.fetchone()
        return user
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def upload_to_hero(url):
    conn = None 
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute("""
                INSERT INTO hero_table (url)
                VALUES (%s)
                RETURNING *;
                """,
                (url,)
        )
        conn.commit()
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def fetch_admin_gallery():
    conn = None 
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute("SELECT * from files;")
        response = cursor.fetchall()
        cursor.execute("Select get_unique_event_names();")
        categories = cursor.fetchone(); 
        
        return [response, categories["get_unique_event_names"]]
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def upload_admin_gallery(client: SyncClient, category: str, description: str, file: FileStorage):
    conn = None
    try:
        conn = get_conn()
        file.save(secure_filename(file.filename))
        filename = secure_filename(file.filename)
        client.storage.from_("AUMV-web").upload(file.filename, filename)
        url = client.storage.from_("AUMV-web").get_public_url(filename)
        cur = conn.cursor(cursor_factory = RealDictCursor)
        cur.execute(
            """
            INSERT INTO files (category, file_url, file_type, description)
            VALUES (%s, %s, %s, %s)
            RETURNING *;
            """,
            (category, url, "image", description)
        )
        conn.commit()
        response = cur.fetchone()
        cur.execute("Select get_unique_event_names();")
        categories = cur.fetchone()

        return [response, categories["get_unique_event_names"]]
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def delete_admin_gallery(client: SyncClient, id: int):
    conn = None
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "SELECT file_url FROM files WHERE id = %s;",
            (id,)
        )
        result = cursor.fetchone()
        file_url = result["file_url"]
        print(file_url)

        photo = file_url.split("/AUMV-web/")[-1]
        client.storage.from_("AUMV-web").remove([photo])
        
        cursor.execute(
            "DELETE FROM files WHERE id = %s RETURNING *;",
            (id,)
        )
        conn.commit()
        cursor.execute("Select get_unique_event_names();")
        categories = cursor.fetchone()

        return categories["get_unique_event_names"]
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def fetch_teachers_data():
    conn = None
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute("SELECT * from teachers;")
        response = cursor.fetchall()
        print(response)
        return response
    except Exception as exc:
        print(str(exc))
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def insert_metadata(client:SyncClient, event_name:str, url:str, file:FileStorage, description:str): 
    video_extensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mpeg', '.mpg', '.m4v', '.webm', '.mkv']
    for extension in video_extensions:
        if file.filename.endswith(extension):
            file_type = "video"
            break
    else:
        file_type = "image"

    return client.table("files").insert({
        "category": event_name,
        "file_url": url,
        "file_type": file_type,
        "description": description
    }).execute()

def delete_metadata(client:SyncClient, files:List[str]):
    for file in files:
        (client.table("files")
        .delete()
        .eq("file_name", file)
        .execute())

def get_final_res(final_res:dict, response:APIResponse):
    for res in response.data:
        if final_res.get(res["file_event"]) is None:
            final_res[res["file_event"]] = []
        temp_data = {"url": res["file_url"],
                    "description": res["description"]}

        final_res[res["file_event"]].append(temp_data)

    return final_res

def insert_teachers_data(client:SyncClient, name: str, email:str, subject:str, joining_date:date, phone_num:numbers, 
                        address:str,dob:date, photo:FileStorage, resume:FileStorage):
    conn = None
    secure_photo_name = secure_filename(photo.filename)
    secure_resume_name = secure_filename(resume.filename)
    try:
        conn = get_conn()
        if photo:
            photo.save(photo.filename)
            client.storage.from_("AUMV-Teachers").upload(secure_photo_name, photo.filename)
            photo_url = client.storage.from_("AUMV-Teachers").get_public_url(secure_photo_name)
        if resume:
            resume.save(resume.filename)
            client.storage.from_("AUMV-Teachers").upload(secure_resume_name, resume.filename)
            resume_url = client.storage.from_("AUMV-Teachers").get_public_url(secure_resume_name)
        
        # conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute("""
                INSERT INTO teachers 
                (name, email, subject, joining_date, phone_num, address, dob, photo, resume)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *;
            """,
            (name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url )
        )
        conn.commit()
        response = cursor.fetchone()
        return response
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def update_teachers_data(client:SyncClient, name: str, email:str, subject:str, joining_date:date, phone_num:numbers, 
                        address:str,dob:date, photo: any, resume: any, id: any):
    conn = None
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute(
            "SELECT photo, resume FROM Teachers WHERE id = %s;",
            (id,)
        )
        response = cursor.fetchone()
        photo_url = response['photo']
        resume_url = response['resume']

        if photo and isinstance(photo, FileStorage):
            photo_name = photo_url.split("/AUMV-Teachers/")[-1]
            client.storage.from_("AUMV-Teachers").remove([photo_name])
            photo.save(photo.filename)
            client.storage.from_("AUMV-Teachers").upload(photo.filename, secure_filename(photo.filename))
            photo = client.storage.from_("AUMV-Teachers").get_public_url(photo.filename)  
        
        if resume and  isinstance(resume, FileStorage):
            resume_name = resume_url.split("/AUMV-Teachers/")[-1]
            client.storage.from_("AUMV-Teachers").remove([resume_name])
            resume.save(resume.filename)
            client.storage.from_("AUMV-Teachers").upload(resume.filename, secure_filename(resume.filename))
            resume = client.storage.from_("AUMV-Teachers").get_public_url(resume.filename)

        cursor.execute("""
                        UPDATE teachers
                        SET name=%s,
                        email=%s,
                        subject=%s,
                        joining_date=%s,
                        phone_num=%s,
                        address=%s,
                        dob=%s,
                        photo=%s,
                        resume=%s
                        WHERE id=%s
                        RETURNING *;
                """, (
            name, email, subject, joining_date, phone_num,
            address, dob, photo, resume, id,
        ))

        updated_row = cursor.fetchone()
        conn.commit()

        return updated_row
    except Exception as exc:
        print(str(exc))
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)
        if isinstance(photo, FileStorage):
            os.remove(photo.filename)
        if isinstance(resume, FileStorage):
            os.remove(resume.filename)

def delete_teacher(client:SyncClient, id: any):
    conn= None
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute(
            "SELECT photo, resume FROM Teachers WHERE id = %s;",
            (id,)
        )
        response = cursor.fetchone()
        photo_url = response['photo']
        resume_url = response['resume']

        photo = photo_url.split("/AUMV-Teachers/")[-1]
        client.storage.from_("AUMV-Teachers").remove([photo])
        
        resume = resume_url.split("/AUMV-Teachers/")[-1]
        print(resume)
        client.storage.from_("AUMV-Teachers").remove([resume])


        cursor.execute(
            "DELETE FROM teachers WHERE id = %s RETURNING *;",
            (id,)
        )
        conn.commit()

        return "Teacher data deleted"
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def add_upcoming_event(title: str, valid_till: date, description: str):
    conn = None
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute("""
                INSERT INTO events 
                (title, valid_till, description)
                VALUES (%s, %s, %s)
                RETURNING *;
            """,
            (title, valid_till, description,)
        )
        conn.commit()
        response = cursor.fetchone()
        return response
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def edit_event(title: str, valid_till: date, description: str, id:any):
    conn = None
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute("""
                        UPDATE events
                        SET title=%s,
                        valid_till=%s,
                        description=%s
                        WHERE id=%s
                        RETURNING *;
            """,
            (title, valid_till, description, id,)
        )
        conn.commit()
        response = cursor.fetchone()
        return response
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def delete_event_by_id(id: any):
    conn = None
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        cursor.execute(
            "DELETE FROM events WHERE id = %s RETURNING *;",
            (id,)
        )
        conn.commit()

        return "Deletion success"
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def upload_video(client: SyncClient, video: FileStorage):
    conn = None
    try:
        conn = get_conn()
        video.save(secure_filename(video.filename))
        filename = secure_filename(video.filename)
        client.storage.from_("AUMV-videos").upload(video.filename, filename)
        url = client.storage.from_("AUMV-videos").get_public_url(filename)
        cur = conn.cursor(cursor_factory = RealDictCursor)
        cur.execute(
            """
            INSERT INTO videos (video_url)
            VALUES (%s)
            RETURNING *;
            """,
            (url,)
        )
        conn.commit()
        response = cur.fetchone()

        return response
    except Exception as exc:
        raise DatabaseError(str(exc))
    finally:
        put_conn(conn)

def if_file_exists(client: SyncClient, files: list[FileStorage], bucket_name: str):
    try:
        message = ""
        for file in files:
            secure_name = secure_filename(file.filename)
            if client.storage.from_(bucket_name).exists(secure_name):
                message = message + f"{file.filename} "
        
        if message != "":
            message += "already exists"
        return message
    except Exception as exc:
        raise DatabaseError(str(exc)) 
