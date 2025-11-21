from supabase._sync.client import SyncClient
from werkzeug.datastructures import FileStorage
from utils.errors import DatabaseError
from werkzeug.utils import secure_filename

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