import os
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from utils.supabase_client import supabase_client
from database.queries import fetch_teachers_data, insert_teachers_data, update_teachers_data, delete_teacher
from utils.validators import if_file_exists

teacher_bp = Blueprint("teacher_bp", __name__)


@teacher_bp.route("/teachers", methods=["GET"], endpoint='get_teachers_endpoint')
@jwt_required()
def get_teachers():
    try:
        teachers = fetch_teachers_data()
        return jsonify({'teachers': teachers}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@teacher_bp.route("/addTeacher", methods=["POST"], endpoint='post_teacher_endpoint')
@jwt_required()
def add_teacher():

    photo = request.files.get("photo")
    resume = request.files.get("resume")

    response = if_file_exists(supabase_client, [photo, resume], "AUMV-Teachers")
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
        response = insert_teachers_data(supabase_client, name, email, subject, joining_date, phone_num, address, dob, photo, resume)
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

@teacher_bp.route("/edit/Teacher/<int:id>", methods=["PUT"], endpoint='edit_teacher_by_id')
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
        
        response = update_teachers_data(supabase_client, name, email, subject, joining_date, phone_num, address, dob, photo, resume, id)
        return jsonify({"message": "Data update successfully",
                        "teacher": response}), 200
    except Exception as exc:
        print(str(exc))
        return jsonify({"error": str(exc)}), 500

@teacher_bp.route("/teacher/delete/<int:id>", methods=["DELETE"], endpoint='delete_teacher_by_id')
@jwt_required()
def delete_teacher_by_id(id):
    try:
        response = delete_teacher(supabase_client, id)
        return jsonify({"message": response}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500