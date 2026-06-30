from supabase import create_client
from config import Config

client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)


def get_storage_client(client_instance=None):
    resolved_client = client_instance or client
    storage_client = getattr(resolved_client, "storage", None)
    if callable(storage_client):
        storage_client = storage_client()
    if storage_client is None:
        raise AttributeError("Supabase client does not expose a storage client")
    return storage_client
