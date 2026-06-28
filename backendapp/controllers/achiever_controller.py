from flask import request
from flask_jwt_extended import jwt_required
from services.achiever_service import fetch_achievers, add_achiever, edit_achiever, remove_achiever
from flask import jsonify

def get_achievers():
    try:
        return jsonify({'message': "success",
                        'achievers': fetch_achievers()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def create_achiever():
    try:
        photo = request.files.get('photo')
        achiever = add_achiever(request.form.to_dict(), photo)
        return jsonify({'achievers': achiever}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def update_achiever(id):
    try:
        photo = request.files.get('photo') or request.form.get('photo')
        achiever = edit_achiever(id, request.form.to_dict(), photo)
        return jsonify({'achievers': achiever}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

@jwt_required()
def delete_achiever(id):
    try:
        return jsonify({'achiever': remove_achiever(id)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500