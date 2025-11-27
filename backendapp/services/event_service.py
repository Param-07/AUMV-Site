from data import queries
from utils.validators import is_valid_date_string, require_fields
REQUIRED = ['title', 'valid_till']

def fetch_events():
    return queries.fetch_all('events')

def fetch_event_by_id(id):
    return queries.fetch_by_id('events', id)

def add_event(data):
    missing = require_fields(data, REQUIRED)
    if missing:
        raise ValueError(f"Missing fields: {missing}")
    if not is_valid_date_string(data.get('valid_till')):
        raise ValueError('valid_till must be a date')
    return queries.insert_event(data.get('title'), data.get('valid_till'), data.get('description'))

def modify_event(id, data):
    return queries.update_event(id, data.get('title'), data.get('valid_till'), data.get('description'))

def remove_event(id):
    return queries.delete_event(id)
