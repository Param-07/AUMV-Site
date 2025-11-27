from dateutil.parser import parse

def is_valid_date_string(date_str):
    if not date_str:
        return False
    try:
        parse(date_str)
        return True
    except Exception:
        return False

def require_fields(data: dict, required: list):
    missing = [f for f in required if not data.get(f)]
    return missing
