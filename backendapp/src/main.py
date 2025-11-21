from unicodedata import category
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from supabase import create_client
from dotenv import load_dotenv
import os
import supabase
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from psycopg2.extras import RealDictCursor

# Import utilities and blueprints
from routes.adminGallery_routes import admin_bp
from routes.event_routes import event_bp
from routes.gallery_routes import gallery_bp
from routes.teacher_routes import teacher_bp
from database.queries import  delete_admin_gallery, delete_event_by_id, delete_teacher, edit_event, fetch_admin_gallery, fetch_teachers_data, insert_teachers_data, update_teachers_data, upload_admin_gallery, upload_to_hero, add_upcoming_event, upload_video
from database.connection import get_conn, put_conn, close_conn
from auth import auth_bp, bcrypt

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
CORS(app)
bcrypt.init_app(app)
jwt = JWTManager(app)


# Register authentication blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(teacher_bp, url_prefix="/admin")
app.register_blueprint(event_bp, url_prefix="/admin")
app.register_blueprint(gallery_bp, url_prefix="/admin")
app.register_blueprint(admin_bp, url_prefix="/admin")

# @app.route('/getAchievers', methods=['GET'])
# def get_videos():
#     try:
#         conn = get_conn()
#         cursor = conn.cursor(cursor_factory = RealDictCursor)
#         cursor.execute("SELECT * from achievers;")
#         response = cursor.fetchall()
#         put_conn(conn)

#         return jsonify({"message": "success",
#                         "achievers": response}), 200
#     except Exception as exc:
#         return jsonify({"error": str(exc)}), 500


# @app.route('/uploadHero', methods=['POST'], endpoint='upload_hero_endpoint')
# @jwt_required()
# def upload_hero():
#     file = request.files['image_video_file']
#     try:
#         file.save(file.filename)

#         if client.storage.from_("AUMV-hero").exists(secure_filename(file.filename)):
#             return jsonify({'message': 'File already uploaded'}), 400

#         client.storage.from_("AUMV-hero").upload(file.filename, secure_filename(file.filename))
#         url = client.storage.from_("AUMV-hero").get_public_url(secure_filename(file.filename))
#         upload_to_hero(url)

#         file.close()
#         return jsonify({'message': 'Hero file uploaded successfully', 'url': url}), 200

#     except Exception as exc:
#         return jsonify({'message': 'Hero file upload failed', 'error': str(exc)}), 500
#     finally:
#         os.remove(file.filename)





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
