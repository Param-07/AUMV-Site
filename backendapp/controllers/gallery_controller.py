from flask import request, jsonify
from flask_jwt_extended import jwt_required
from data import queries
from services.gallery_service import fetch_gallery, upload_item, delete_item

def get_gallery():
    try:
        hero_images = queries.fetch_all("hero_table")
        images = fetch_gallery()
        return jsonify({'images': images,
                        'hero_images': hero_images}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def upload_gallery_item():
    try:
        file = request.files.get('photo')
        event_name = request.form.get('event_name')
        description = request.form.get('description')
        resp = upload_item(file, event_name, description)
        return jsonify({'message': 'success', 'data': resp}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def delete_gallery_item(id):
    try:
        delete_item(id)
        return jsonify({'message': 'deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
