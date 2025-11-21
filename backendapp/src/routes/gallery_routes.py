import os
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
from database.connection import get_conn, put_conn
from utils.supabase_client import supabase_client
from database.queries import fetch_admin_gallery, get_data_from_DB, upload_video
from utils.validators import if_file_exists

gallery_bp = Blueprint("gallery_bp", __name__)


@gallery_bp.route('/getVideos', methods=['GET'])
def get_videos():
    try:
        response = get_data_from_DB("SELECT * from videos;")

        return jsonify({"message": "success",
                        "videos": response}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

@gallery_bp.route("/addVideo", methods=["POST"], endpoint='post_video_endpoint')
@jwt_required()
def add_Video():

    video = request.files.get("video")
    

    response = if_file_exists(supabase_client, [video], "AUMV-Teachers")
    if response != "":
        return jsonify({'error': response}), 400

    try:
        response = upload_video(supabase_client, video)

        return jsonify({'message': 'Teacher details added succesfully', 
                        'video': response}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({'error': str(exc)}), 500
    finally:
        if os.path.exists(secure_filename(video.filename)):
            os.remove(secure_filename(video.filename))


@gallery_bp.route('/getHero', methods=['GET'])
def fetch_hero_images():
    try:
        response = get_data_from_DB("Select url from hero_table;")
        return jsonify({'message': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@gallery_bp.route('/fetch', methods=['GET'])
def fetch_files():
    try:
        response = fetch_admin_gallery()
        return jsonify({'message': 'success',
                        'images': response[0],
                        'categories': response[1]}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

@gallery_bp.route('/gallery', methods=['GET'])
def get_gallery_data():
    try:
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute("SELECT get_gallery_grouped ();")
        response = cursor.fetchone()[0]
        put_conn(conn)

        return jsonify({"message": "success",
                        "images": response}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500
