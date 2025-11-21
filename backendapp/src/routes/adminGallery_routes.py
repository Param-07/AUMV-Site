import os
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from utils.supabase_client import supabase_client
from database.queries import delete_admin_gallery, upload_admin_gallery
from utils.validators import if_file_exists

admin_bp = Blueprint("admin_bp", __name__)

@admin_bp.route('/upload', methods=['POST'], endpoint='upload_file_endpoint')
@jwt_required()
def upload_file():
    file = request.files['photo']
    event_name = request.form['event_name']
    description = request.form['description']

    try: 
        message = if_file_exists(supabase_client, [file], "AUMV-web")

        if message != "":
            return jsonify({'error': message}), 400


        response = upload_admin_gallery(supabase_client, event_name, description, file)
        return jsonify({'message': 'success',
                        'images': response[0],
                        'categories': response[1]}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({'message': 'File upload failed', 'error': str(exc)}), 500
    finally:
        if os.path.exists(file.filename):
            os.remove(file.filename)

@admin_bp.route('/delete/<int:id>', methods=['DELETE'], endpoint='delete_file_endpoint')
@jwt_required()
def delete_file(id):
    try:
        categories = delete_admin_gallery(supabase_client, id)

        return jsonify({"message": "file deleted succesfully",
                        "categories": categories}), 200
    except Exception as exc:
        return jsonify({'message': 'File deletion failed', 'error': str(exc)}), 500