from werkzeug.datastructures import FileStorage
from utils.file_utils import get_public_url_for_upload, remove_local_file, save_file_locally
from data import queries
from utils.supabase_client import client
BUCKET = 'AUMV-hero'

def upload_file(file, bucket_name):
    return client.storage.from_(bucket_name).upload(file.filename, file)

def fetch_hero():
    return queries.fetch_all('hero_table')

def add_hero(hero, photo):
    local_photo = None
    try:
        if photo:
            print("here2")
            local_photo, photo_filename = save_file_locally(photo)
            photo_url = get_public_url_for_upload(BUCKET, photo_filename, local_photo)
        else:
            photo_url = None
        return queries.insert_hero(hero.get('category'), photo_url)
    except Exception as e:
        return {'error': str(e)}, 500
    finally:
        remove_local_file(local_photo)

def edit_hero(id, hero, photo):
    local_photo = None
    img_updated = False
    try:
        if isinstance(photo, FileStorage):
            local_photo, photo_filename = save_file_locally(photo)
            photo_url = get_public_url_for_upload(BUCKET, photo_filename, local_photo)
            img_updated= True
        else:
            photo_url = photo
        return queries.update_hero(id, hero.get('category'), photo_url, img_updated, BUCKET)
    except Exception as e:
        return {'error': str(e)}, 500
    finally:
        remove_local_file(local_photo)

def remove_hero(id):
    try:
        return queries.delete_hero(id, BUCKET)
    except Exception as e:
        return {'error': str(e)}, 500