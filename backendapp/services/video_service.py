from utils.file_utils import save_file_locally, remove_local_file, get_public_url_for_upload
from utils.supabase_client import client
from data import queries
BUCKET = 'AUMV-Teachers'

def fetch_videos():
    return queries.fetch_all('videos')

def upload_video_service(video):
    local_path = None
    try:
        local_path, filename = save_file_locally(video)
        client.storage.from_(BUCKET).upload(filename, local_path)
        url = get_public_url_for_upload(client, BUCKET, filename)
        return queries.insert_video(url)
    finally:
        remove_local_file(local_path)

def delete_video_service(id):
    client.storage.from_(BUCKET).remove([id])
    return queries.delete_video(id)
