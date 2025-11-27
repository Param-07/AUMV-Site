from services.achiever_service import fetch_achievers

def get_achievers():
    try:
        return {'achievers': fetch_achievers()}, 200
    except Exception as e:
        return {'error': str(e)}, 500
