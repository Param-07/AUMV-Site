from flask import request, jsonify
from flask_jwt_extended import jwt_required
from data import queries
from services.facilities_sevice import add_facilities, fetch_facilities, remove_facilities
def get_facilities():
    try:
        facilities = fetch_facilities()
        return jsonify({'facilities': facilities}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @jwt_required()
# def get_teacher(id):
#     try:
#         teacher = fetch_teacher_by_id(id)
#         return jsonify({'teacher': teacher}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@jwt_required()
def create_facilities():
    try:
        photo = request.files.get('image')
        data = request.form.to_dict()
        facilities = add_facilities(data, photo)
        return jsonify({'message': 'created', 'facilities': facilities}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def delete_facilities(id):
    try:
        result = remove_facilities(id)
        return jsonify({'message': 'deleted' if result else 'not found'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
