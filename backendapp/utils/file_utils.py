import os
from werkzeug.utils import secure_filename
from config import Config

def ensure_temp_dir():
    os.makedirs(Config.UPLOAD_TEMP_DIR, exist_ok=True)

def save_file_locally(file_storage):
    ensure_temp_dir()
    filename = secure_filename(file_storage.filename)
    local_path = os.path.join(Config.UPLOAD_TEMP_DIR, filename)
    file_storage.save(local_path)
    return local_path, filename

def remove_local_file(path):
    try:
        if path and os.path.exists(path):
            os.remove(path)
    except Exception:
        pass

def get_public_url_for_upload(client, bucket, target_name):
    try:
        resp = client.storage.from_(bucket).get_public_url(target_name)
        return resp
    except Exception as e:
        return {"error": str(e)}
