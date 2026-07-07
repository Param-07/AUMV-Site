from flask import request
from werkzeug.datastructures import FileStorage
from utils.file_utils import get_public_url_for_upload, remove_local_file, save_file_locally
from data import queries
from utils.supabase_client import get_storage_client
BUCKET = 'AUMV-achievers'

def upload_file(file, bucket_name):
    return get_storage_client().from_(bucket_name).upload(file.filename, file)

def fetch_achievers():
    return queries.fetch_all('achievers')

def add_achiever(achiever, photo):
    local_photo = None
    try:
        if photo:
            local_photo, photo_filename = save_file_locally(photo)
            photo_url = get_public_url_for_upload(BUCKET, photo_filename, local_photo)
        else:
            photo_url = None
        return queries.insert_achiever(achiever.get('name'), photo_url, achiever.get('year'), achiever.get('class'),
                        achiever.get('percentage'), achiever.get('board'), achiever.get('branch'))
    except Exception as e:
        return {'error': str(e)}, 500
    finally:
        remove_local_file(local_photo)

def edit_achiever(id, achiever, photo):
    local_photo = None
    img_updated = False
    try:
        if isinstance(photo, FileStorage):
            local_photo, photo_filename = save_file_locally(photo)
            photo_url = get_public_url_for_upload(BUCKET, photo_filename, local_photo)
            img_updated= True
        else:
            photo_url = photo
        return queries.update_achiever(id, achiever.get('name'), photo_url,
                     achiever.get('year'), achiever.get('class'), achiever.get('percentage'),
                     img_updated, BUCKET, achiever.get('board'), achiever.get('branch'))
    except Exception as e:
        return {'error': str(e)}, 500
    finally:
        remove_local_file(local_photo)

def remove_achiever(id):
    try:
        return queries.delete_achiever(id, BUCKET)
    except Exception as e:
        return {'error': str(e)}, 500