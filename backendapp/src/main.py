from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from supabase import create_client
from dotenv import load_dotenv
import os
import supabase
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

# Import utilities and blueprints
from utils.databaseCRUD import insert_metadata, delete_metadata, get_final_res, insert_teachers_data, update_teachers_data
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
        response = client.postgrest.rpc("get_gallery_grouped", {}).execute()
        print(response.data)
        return jsonify({"message": "success",
                        "images": response.data}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

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
        categories = client.postgrest.rpc("get_unique_event_names", {}).execute()
        print(categories)
        # final_res = get_final_res({}, response)
        return jsonify({'message': 'success',
                        'images': response.data,
                        'categories': categories.data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/upload', methods=['POST'], endpoint='upload_file_endpoint')
@jwt_required()
def upload_file():
    file = request.files['photo']
    event_name = request.form['event_name']
    description = request.form['description']

    try:
        file.save(file.filename)
        filename = secure_filename(file.filename)

        # Check if already exists
        if client.storage.from_("AUMV-web").exists(filename):
            return jsonify({'message': f'{filename} is already uploaded'}), 400

        # Upload to Supabase storage
        client.storage.from_("AUMV-web").upload(filename, file.filename)
        url = client.storage.from_("AUMV-web").get_public_url(filename)

        response = insert_metadata(client, event_name, url, file, description)
        categories = client.postgrest.rpc("get_unique_event_names", {}).execute()

        return jsonify({'message': 'success',
                        'images': response.data,
                        'categories': categories.data}), 200

    except Exception as exc:
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
        client.table("Hero Table").insert({"url": url}).execute()

        file.close()
        return jsonify({'message': 'Hero file uploaded successfully', 'url': url}), 200

    except Exception as exc:
        return jsonify({'message': 'Hero file upload failed', 'error': str(exc)}), 500


@app.route('/delete/<int:id>', methods=['DELETE'], endpoint='delete_file_endpoint')
@jwt_required()
def delete_file(id):
    try:
        data = client.table("files").select("file_url").eq("id", id).execute()
        data = data.data

        photo = data[0]["file_url"].split("/AUMV-web/")[-1]
        client.storage.from_("AUMV-web").remove([photo])

        client.table("files").delete().eq("id", id).execute();
        categories = client.postgrest.rpc("get_unique_event_names", {}).execute()

        return jsonify({"message": "file deleted succesfully",
                        "categories": categories.data}), 200
    except Exception as exc:
        return jsonify({'message': 'File deletion failed', 'error': str(exc)}), 500

@app.route("/teachers", methods=["GET"], endpoint='get_teachers_endpoint')
@jwt_required()
def get_teachers():
    try:
        # response = client.table("Teachers").select("id", "name", "subject", "resume", "photo").execute()
        response = client.table("Teachers").select("*").execute()
        teachers = response.data
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

        old_data = client.table("Teachers").select("*").eq("id", id).execute()
        old_data = old_data.data
        print(old_data[0])
        print(old_data[0]["photo"])

        if photo and isinstance(photo, FileStorage):
            photo_name = old_data[0]["photo"].split("/AUMV-Teachers/")[-1]
            client.storage.from_("AUMV-Teachers").remove([photo_name])
            photo.save(photo.filename)
            client.storage.from_("AUMV-Teachers").upload(photo.filename, photo.filename)
            photo = client.storage.from_("AUMV-Teachers").get_public_url(photo.filename)
        
        if resume and  isinstance(resume, FileStorage):
            resume_name = old_data[0]["resume"].split("/AUMV-Teachers/")[-1]
            client.storage.from_("AUMV-Teachers").remove([resume_name])
            resume.save(resume.filename)
            client.storage.from_("AUMV-Teachers").upload(resume.filename, resume.filename)
            resume = client.storage.from_("AUMV-Teachers").get_public_url(resume.filename)
        
        response = update_teachers_data(client, name, email, subject, joining_date, phone_num, address, dob, photo, resume, id).data
        return jsonify({"message": "Data update successfully",
                        "teacher": response}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({"error": str(exc)}), 500

@app.route("/teacher/delete/<int:id>", methods=["DELETE"], endpoint='delete_teacher_by_id')
@jwt_required()
def delete_teacher_by_id(id):
    try:
        data = client.table("Teachers").select("photo", "resume").eq("id", id).execute()
        data = data.data

        photo = data[0]["photo"].split("/AUMV-Teachers/")[-1]
        client.storage.from_("AUMV-Teachers").remove([photo])
        
        resume = data[0]["resume"].split("/AUMV-Teachers/")[-1]
        print(resume)
        client.storage.from_("AUMV-Teachers").remove([resume])

        client.table('Teachers').delete().eq("id", id).execute()
        return jsonify({"message": "Teacher data deleted"}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/addTeacher", methods=["POST"], endpoint='post_teacher_endpoint')
@jwt_required()
def add_teacher():
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    joining_date = request.form.get("joining_date")
    phone_num = request.form.get("phone_num")
    address = request.form.get("address")
    dob = request.form.get("dob")
    photo = request.files.get("photo")
    resume = request.files.get("resume")

    secure_photo_name = secure_filename(photo.filename)
    secure_resume_name = secure_filename(resume.filename)

    try:
        if photo:
            photo.save(photo.filename)
            if client.storage.from_("AUMV-Teachers").exists(secure_photo_name):
                return jsonify({'message': 'File already uploaded'}), 400
            client.storage.from_("AUMV-Teachers").upload(secure_photo_name, photo.filename)
            photo_url = client.storage.from_("AUMV-Teachers").get_public_url(secure_photo_name)
        if resume:
            resume.save(resume.filename)
            if client.storage.from_("AUMV-Teachers").exists(secure_resume_name):
                client.storage.from_("AUMV-Teachers").remove([secure_photo_name])
                return jsonify({'message': 'File already uploaded'}), 400
            client.storage.from_("AUMV-Teachers").upload(secure_resume_name, resume.filename)
            resume_url = client.storage.from_("AUMV-Teachers").get_public_url(secure_resume_name)

        response = insert_teachers_data(client, name, email, subject, joining_date, phone_num, address, dob, photo_url, resume_url).data
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
