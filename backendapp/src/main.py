from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from supabase import create_client
from dotenv import load_dotenv
import os

# Import utilities and blueprints
from utils.databaseCRUD import insert_metadata, delete_metadata, get_final_res, insert_teachers_data
from auth import auth_bp, bcrypt

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
CORS(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# Initialize Supabase client (do this ONCE, globally)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Register authentication blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")

@app.route('/getHero', methods=['GET'])
def fetch_hero_images():
    try:
        response = client.table('Hero Table').select("url").execute()
        return jsonify({'message': response.model_dump_json()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/fetch', methods=['GET'])
def fetch_files():
    try:
        response = client.table('files').select("*").execute()
        final_res = get_final_res({}, response)
        return jsonify({'message': final_res}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/upload', methods=['POST'], endpoint='upload_file_endpoint')
@jwt_required()
def upload_file():
    try:
        file = request.files['image_video_file']
        event_name = request.form['event_name']
        description = request.form['description']

        file.save(file.filename)

        # Check if already exists
        if client.storage.from_("AUMV-web").exists(file.filename):
            return jsonify({'message': 'File already uploaded'}), 400

        # Upload to Supabase storage
        client.storage.from_("AUMV-web").upload(file.filename, file.filename)
        url = client.storage.from_("AUMV-web").get_public_url(file.filename)

        insert_metadata(client, event_name, url, file, description)
        file.close()
        return jsonify({'message': 'File uploaded successfully', 'url': url}), 200

    except Exception as exc:
        return jsonify({'message': 'File upload failed', 'error': str(exc)}), 500

@app.route('/uploadHero', methods=['POST'], endpoint='upload_hero_endpoint')
@jwt_required()
def upload_hero():
    try:
        file = request.files['image_video_file']
        file.save(file.filename)

        if client.storage.from_("AUMV-hero").exists(file.filename):
            return jsonify({'message': 'File already uploaded'}), 400

        client.storage.from_("AUMV-hero").upload(file.filename, file.filename)
        url = client.storage.from_("AUMV-hero").get_public_url(file.filename)
        client.table("Hero Table").insert({"url": url}).execute()

        file.close()
        return jsonify({'message': 'Hero file uploaded successfully', 'url': url}), 200

    except Exception as exc:
        return jsonify({'message': 'Hero file upload failed', 'error': str(exc)}), 500


@app.route('/delete', methods=['DELETE'], endpoint='delete_file_endpoint')
@jwt_required()
def delete_file():
    try:
        file_list = request.form['files'].split(',')
        client.storage.from_("AUMV-web").remove(file_list)
        delete_metadata(client, file_list)
        return jsonify({'message': 'File deleted successfully'}), 200

    except Exception as exc:
        return jsonify({'message': 'File deletion failed', 'error': str(exc)}), 500

@app.route("/teachers", methods=["GET"], endpoint='get_teachers_endpoint')
@jwt_required()
def get_teachers():
    try:
        response = client.table("Teachers").select("*").execute()
        teachers = response.data
        return jsonify({'teachers': teachers}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/addTeacher", methods=["POST"], endpoint='post_teacher_endpoint')
@jwt_required()
def add_teacher():
    print("here")
    try:
        # for key,value in request.form.items():
        #     print(key,value)
        name = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        joining_date = request.form.get("joining_date")
        phone_num = request.form.get("phone_num")
        address = request.form.get("address")
        dob = request.form.get("dob")
        photo = request.files.get("photo")
        photo.save(photo.filename)
        resume = request.files.get("resume")
        resume.save(resume.filename)
        if photo:
            if client.storage.from_("AUMV-Teachers").exists(photo.filename):
                return jsonify({'message': 'File already uploaded'}), 400
            client.storage.from_("AUMV-Teachers").upload(photo.filename, photo.filename)
            photo = client.storage.from_("AUMV-Teachers").get_public_url(photo.filename)
        if resume:
            if client.storage.from_("AUMV-Teachers").exists(resume.filename):
                return jsonify({'message': 'File already uploaded'}), 400
            client.storage.from_("AUMV-Teachers").upload(resume.filename, resume.filename)
            resume = client.storage.from_("AUMV-Teachers").get_public_url(resume.filename)

        insert_teachers_data(client, name, email, subject, joining_date, phone_num, address, dob, photo, resume)
        return jsonify({'message': 'Teacher details added succesfully'}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({'error': str(exc)}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
