from flask import request, jsonify
from flask_jwt_extended import jwt_required
from services.video_service import fetch_videos, upload_video_service, delete_video_service

def get_videos():
    try:
        videos = fetch_videos()
        return jsonify({'videos': videos}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def upload_video():
    try:
        video = request.files.get('video')
        resp = upload_video_service(video)
        return jsonify({'message': 'success', 'video': resp}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def delete_video(id):
    try:
        delete_video_service(id)
        return jsonify({'message': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
