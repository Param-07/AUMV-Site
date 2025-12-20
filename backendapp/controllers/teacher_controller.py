from flask import request, jsonify
from flask_jwt_extended import jwt_required
from services.teacher_service import fetch_teachers, fetch_teacher_by_id, add_teacher, modify_teacher, remove_teacher

@jwt_required()
def get_teachers():
    try:
        teachers = fetch_teachers()
        return jsonify({'teachers': teachers}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def get_teacher(id):
    try:
        teacher = fetch_teacher_by_id(id)
        return jsonify({'teacher': teacher}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def create_teacher():
    try:
        photo = request.files.get('photo')
        resume = request.files.get('resume')
        data = request.form.to_dict()
        teacher = add_teacher(data, photo, resume)
        return jsonify({'message': 'created', 'teacher': teacher}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def update_teacher(id):
    try:
        photo = request.files.get('photo') or request.form.get('photo')
        resume = request.files.get('resume') or request.form.get('resume')
        data = request.form.to_dict()
        teacher = modify_teacher(id, data, photo, resume)
        return jsonify({'message': 'updated', 'teacher': teacher}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def delete_teacher(id):
    try:
        result = remove_teacher(id)
        return jsonify({'message': 'deleted' if result else 'not found'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
