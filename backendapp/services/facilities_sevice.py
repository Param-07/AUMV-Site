from data import queries
from utils.file_utils import save_file_locally, remove_local_file, get_public_url_for_upload
from utils.supabase_client import client
BUCKET = "AUMV-facilities"

def fetch_facilities():
    return queries.get_facilities()

# def fetch_teacher_by_id(id):
#     return queries.fetch_by_id('teachers', id)

def add_facilities(form_data, photo):
    local_photo = local_resume = None
    try:
        if photo:
            local_photo, photo_filename = save_file_locally(photo)
            client.storage.from_(BUCKET).upload(photo_filename, local_photo)
            photo_url = get_public_url_for_upload(client, BUCKET, photo_filename)
        else:
            photo_url = None
        facilities = queries.insert_facilities(
            form_data.get('category'), photo_url
        )
        return facilities
    finally:
        remove_local_file(local_photo)
        remove_local_file(local_resume)

def remove_facilities(id):
    return queries.delete_facilities(id)
