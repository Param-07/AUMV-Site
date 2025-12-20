from werkzeug.datastructures import FileStorage
from data import queries
from utils.file_utils import save_file_locally, remove_local_file, get_public_url_for_upload
from utils.supabase_client import client
BUCKET = "AUMV-Teachers"

def fetch_teachers():
    return queries.fetch_all('teachers')

def fetch_teacher_by_id(id):
    return queries.fetch_by_id('teachers', id)

def add_teacher(form_data, photo, resume):
    local_photo = local_resume = None
    try:
        if photo:
            local_photo, photo_filename = save_file_locally(photo)
            photo_url = get_public_url_for_upload(BUCKET, photo_filename, local_photo)
        else:
            photo_url = None
        if resume:
            local_resume, resume_filename = save_file_locally(resume)
            resume_url = get_public_url_for_upload(BUCKET, resume_filename, local_resume)
        else:
            resume_url = None
        teacher = queries.insert_teacher(
            form_data.get('name'), form_data.get('email'), form_data.get('subject'),
            form_data.get('joining_date'), form_data.get('phone_num'), form_data.get('address'),
            form_data.get('dob'), photo_url, resume_url
        )
        return teacher
    finally:
        remove_local_file(local_photo)
        remove_local_file(local_resume)

def modify_teacher(id, form_data, photo, resume):
    local_photo = local_resume = None
    photo_updated = resume_updated = False
    try:
        if isinstance(photo, FileStorage):
            local_photo, photo_filename = save_file_locally(photo)
            photo_url = get_public_url_for_upload(BUCKET, photo_filename, local_photo)
            photo_updated = True
        else:
            photo_url = photo
        if isinstance(resume, FileStorage):
            local_resume, resume_filename = save_file_locally(resume)
            resume_url = get_public_url_for_upload(BUCKET, resume_filename, local_resume)
            resume_updated = True
        else:
            resume_url = resume

        teacher = queries.update_teacher(
            id, form_data.get('name'), form_data.get('email'), form_data.get('subject'),
            form_data.get('joining_date'), form_data.get('phone_num'), form_data.get('address'),
            form_data.get('dob'), photo_url, resume_url, photo_updated, resume_updated, BUCKET
        )
        return teacher
    except Exception as ex:
        print(str(ex))
    finally:
        remove_local_file(local_photo)
        remove_local_file(local_resume)

def remove_teacher(id):
    return queries.delete_teacher(id, BUCKET)
