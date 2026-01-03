from flask import request
from services.mainPage_service import fetch_hero, add_hero, edit_hero, remove_hero

def get_hero():
    try:
        return {'message': "success",
                'hero': fetch_hero()}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def create_hero():
    try:
        photo = request.files.get('photo')
        print(photo)
        print("here")
        return {'hero': add_hero(request.form.to_dict(), photo)}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def update_hero(id):
    try:
        photo = request.files.get('photo') or request.form.get('photo')
        return {'hero': edit_hero(id, request.form.to_dict(), photo)}, 200
    except Exception as e:
        print(str(e))
        return {'error': str(e)}, 500

def delete_hero(id):
    try:
        return {'hero': remove_hero(id)}, 200
    except Exception as e:
        return {'error': str(e)}, 500