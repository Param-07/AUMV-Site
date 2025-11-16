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
from database.queries import  delete_admin_gallery, fetch_admin_gallery, fetch_teachers_data, if_file_exists, insert_teachers_data, update_teachers_data, upload_admin_gallery
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

# Initialize Supabase client (do this ONCE, globally)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Register authentication blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")

@app.route('/gallery', methods=['GET'])
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

@app.route('/getHero', methods=['GET'])
def fetch_hero_images():
    try:
        conn = get_conn()
        cursor = conn.cursor(cursor_factory = RealDictCursor)
        cursor.execute("Select url from hero_table;")
        response = cursor.fetchall()
        put_conn(conn)
        return jsonify({'message': response}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/fetch', methods=['GET'])
def fetch_files():
    try:
        response = fetch_admin_gallery()
        return jsonify({'message': 'success',
                        'images': response[0],
                        'categories': response[1]}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/upload', methods=['POST'], endpoint='upload_file_endpoint')
@jwt_required()
def upload_file():
    file = request.files['photo']
    event_name = request.form['event_name']
    description = request.form['description']

    try: 
        message = if_file_exists(client, [file], "AUMV-web")

        if message != "":
            return jsonify({'error': message}), 400


        response = upload_admin_gallery(client, event_name, description, file)
        return jsonify({'message': 'success',
                        'images': response[0],
                        'categories': response[1]}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({'message': 'File upload failed', 'error': str(exc)}), 500
    finally:
        if os.path.exists(file.filename):
            os.remove(file.filename)


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
        client.table("hero_table").insert({"url": url}).execute()

        file.close()
        return jsonify({'message': 'Hero file uploaded successfully', 'url': url}), 200

    except Exception as exc:
        return jsonify({'message': 'Hero file upload failed', 'error': str(exc)}), 500


@app.route('/delete/<int:id>', methods=['DELETE'], endpoint='delete_file_endpoint')
@jwt_required()
def delete_file(id):
    try:
        categories = delete_admin_gallery(client, id)

        return jsonify({"message": "file deleted succesfully",
                        "categories": categories}), 200
    except Exception as exc:
        return jsonify({'message': 'File deletion failed', 'error': str(exc)}), 500

@app.route("/teachers", methods=["GET"], endpoint='get_teachers_endpoint')
@jwt_required()
def get_teachers():
    try:
        teachers = fetch_teachers_data()
        return jsonify({'teachers': teachers}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/teachers/<int:id>", methods=["GET"], endpoint='get_teachers_by_id')
@jwt_required()
def get_teacher_by_id(id):
    try:
        response = client.table("Teachers").select("*").eq("id",id).execute();
        teacher = response.data
        return jsonify({"teacher": teacher}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

@app.route("/edit/teacher/<int:id>", methods=["PUT"], endpoint='edit_teacher_by_id')
@jwt_required()
def edit_teacher_by_id(id):
    try:
        name = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        joining_date = request.form.get("joining_date")
        phone_num = request.form.get("phone_num")
        address = request.form.get("address")
        dob = request.form.get("dob")
        photo = request.files.get("photo")
        resume = request.files.get("resume")
        if photo is None:
            photo = request.form.get("photo")
        if resume is None:
            resume = request.form.get("resume")
        
        response = update_teachers_data(client, name, email, subject, joining_date, phone_num, address, dob, photo, resume, id)
        return jsonify({"message": "Data update successfully",
                        "teacher": response}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({"error": str(exc)}), 500

@app.route("/teacher/delete/<int:id>", methods=["DELETE"], endpoint='delete_teacher_by_id')
@jwt_required()
def delete_teacher_by_id(id):
    try:
        data = client.table("teachers").select("photo", "resume").eq("id", id).execute()
        data = data.data

        photo = data[0]["photo"].split("/AUMV-Teachers/")[-1]
        client.storage.from_("AUMV-Teachers").remove([photo])
        
        resume = data[0]["resume"].split("/AUMV-Teachers/")[-1]
        print(resume)
        client.storage.from_("AUMV-Teachers").remove([resume])

        client.table('teachers').delete().eq("id", id).execute()
        return jsonify({"message": "Teacher data deleted"}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/addTeacher", methods=["POST"], endpoint='post_teacher_endpoint')
@jwt_required()
def add_teacher():

    photo = request.files.get("photo")
    resume = request.files.get("resume")

    response = if_file_exists(client, [photo, resume], "AUMV-Teachers")
    if response != "":
        return jsonify({'error': response}), 400
        
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    joining_date = request.form.get("joining_date")
    phone_num = request.form.get("phone_num")
    address = request.form.get("address")
    dob = request.form.get("dob")

    try:
        response = insert_teachers_data(client, name, email, subject, joining_date, phone_num, address, dob, photo, resume)
        print(response)
        return jsonify({'message': 'Teacher details added succesfully', 
                        'teacher': response}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({'error': str(exc)}), 500
    finally:
        if os.path.exists(photo.filename):
            os.remove(photo.filename)
        if os.path.exists(resume.filename):
            os.remove(resume.filename)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
