from data import queries
from utils.file_utils import save_file_locally, remove_local_file, get_public_url_for_upload
from utils.supabase_client import client
BUCKET = "AUMV-facilities"

def fetch_facilities():
    return queries.get_facilities()

def add_facilities(form_data, photo):
    local_photo = None
    try:
        if photo:
            local_photo, photo_filename = save_file_locally(photo)
            photo_url = get_public_url_for_upload(BUCKET, photo_filename, local_photo)
        else:
            photo_url = None
        facilities = queries.insert_facilities(
            form_data.get('category'), photo_url
        )
        return facilities
    finally:
        remove_local_file(local_photo)

def remove_facilities(id):
    return queries.delete_facilities(BUCKET, id)
