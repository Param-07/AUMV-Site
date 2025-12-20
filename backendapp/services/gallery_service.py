from utils.file_utils import save_file_locally, remove_local_file, get_public_url_for_upload
from utils.supabase_client import client
from data import queries
BUCKET = 'AUMV-web'

def fetch_gallery():
    return queries.fetch_gallery_grouped()

def upload_item(file, event_name, description):
    local_path = None
    try:
        local_path, filename = save_file_locally(file)
        url = get_public_url_for_upload(BUCKET, filename, local_path)
        return queries.insert_gallery(event_name, description, url)
    finally:
        remove_local_file(local_path)

def delete_item(id):
    return queries.delete_gallery(BUCKET, id)
