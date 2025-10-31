from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager
from storage3._sync import client
from supabase import create_client, Client
from dotenv import load_dotenv
from utils.databaseCRUD import (insert_metadata, delete_metadata, get_final_res)
from auth import auth_bp, bcrypt
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
bcrypt.init_app(app)
jwt = JWTManager(app)
cors = CORS(app)

app.register_blueprint(auth_bp, url_prefix = "/auth")

@app.route('/getHero', methods = ['GET'])   
def fetch_imgs():
    response = (client.table('Hero Table')
    .select("url")
    .execute())

    return jsonify({'message': response.model_dump_json()}),200

@app.route('/fetch', methods = ['GET'])   
def fetch_imgs_vids():
    response = (client.table('files')
    .select("*")
    .execute())

    print(response)

    final_res = {}
    final_res = get_final_res(final_res, response)
    return jsonify({'message': final_res}),200
    
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['image_video_file']
    event_name = request.form['event_name']
    description = request.form['description']

    try:
        file.save(file.filename)
        if client.storage.from_("AUMV-web").exists(file.filename):
            return jsonify({'message': 'File already uploaded'}),400

        client.storage.from_("AUMV-web").upload(file.filename, file.filename)
        url = client.storage.from_("AUMV-web").get_public_url(file.filename)
        insert_metadata(client, event_name, url, file, description)
        print(url)
        file.close()
        return jsonify({'message': 'File uploaded successfully'}),200
    except Exception as exc:
        return jsonify({'message': 'File upload failed', 'error': str(exc)}), 500

@app.route('/uploadHero', methods=['POST'])
def upload():
    file = request.files['image_video_file']

    try:
        file.save(file.filename)
        if client.storage.from_("AUMV-hero").exists(file.filename):
            return jsonify({'message': 'File already uploaded'}),400

        client.storage.from_("AUMV-hero").upload(file.filename, file.filename)
        url = client.storage.from_("AUMV-hero").get_public_url(file.filename)
        client.table("Hero Table").insert({
            "url": url
        }).execute()
        print(url)
        file.close()
        return jsonify({'message': 'File uploaded successfully'}),200
    except Exception as exc:
        return jsonify({'message': 'File upload failed', 'error': str(exc)}), 500

@app.route('/delete', methods=['DELETE'])
def delete_file():
    file = request.form['files']
    file = file.split(',')
    try:
        client.storage.from_("AUMV-web").remove(file)
        delete_metadata(client, file)
        return jsonify({'message': 'File deleted successfully'}),200
    except Exception as exc:
        return jsonify({'message': 'File deletion failed', 'error': str(exc)}), 500

if __name__ == "__main__":
    try:
        client = create_client(SUPABASE_URL, SUPABASE_KEY)
        app.run(host='0.0.0.0', port=8000, debug=True)
    except Exception as exc:
        print(exc)