from flask import request
from services.achiever_service import fetch_achievers, add_achiever, edit_achiever, remove_achiever

def get_achievers():
    try:
        return {'message': "success",
                'achievers': fetch_achievers()}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def create_achiever():
    try:
        photo = request.files.get('photo')
        print(photo)
        print("here")
        return {'achiever': add_achiever(request.form.to_dict(), photo)}, 200
    except Exception as e:
        return {'error': str(e)}, 500

def update_achiever(id):
    try:
        photo = request.files.get('photo') or request.form.get('photo')
        return {'achiever': edit_achiever(id, request.form.to_dict(), photo)}, 200
    except Exception as e:
        print(str(e))
        return {'error': str(e)}, 500

def delete_achiever(id):
    try:
        return {'achiever': remove_achiever(id)}, 200
    except Exception as e:
        return {'error': str(e)}, 500