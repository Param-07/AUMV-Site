from typing import List
from postgrest.base_request_builder import APIResponse
from supabase._sync.client import SyncClient
from werkzeug.datastructures import FileStorage

def insert_metadata(client:SyncClient, event_name:str, url:str, file:FileStorage, description:str): 
    video_extensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mpeg', '.mpg', '.m4v', '.webm', '.mkv']
    for extension in video_extensions:
        if file.filename.endswith(extension):
            file_type = "video"
            break
    else:
        file_type = "image"

    client.table("files").insert({
        "file_event": event_name,
        "file_url": url,
        "file_name": file.filename,
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
