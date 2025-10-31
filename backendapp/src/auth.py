from ast import Not
from datetime import timedelta
from json import load
from click import password_option
from supabase import create_client
from flask import Flask, jsonify, Blueprint, request
from flask_jwt_extended import create_access_token, JWTManager, create_refresh_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt, check_password_hash
import os
from dotenv import load_dotenv

load_dotenv()
auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

@auth_bp.route("/register", methods=["POST"])
def register():
    username = request.form["username"]
    password = request.form["password"]
    email = request.form["email"]

    client = create_client(SUPABASE_URL, SUPABASE_KEY)

    response = (client.table("Admin Table")
                .select("email")
                .eq("email", email)
                .execute())

    print(response)
    if response.data.count is not None :
        return jsonify({"message": "Email already exists", "status": 0}), 400
    
    password = bcrypt.generate_password_hash(password).decode('utf-8')
    response = (client.table("Admin Table")
                .insert({"username": username, "password": password, "email": email})
                .execute())

    return jsonify({"message": "User registered successfully", "status": 1}), 200

@auth_bp.route("/login", methods=["POST"])
def login():
    password = request.form["password"]
    email = request.form["email"]

    client = create_client(SUPABASE_URL, SUPABASE_KEY)
    response = (client.table("Admin Table")
                .select("*")
                .eq("email", email)
                .execute())

    print(response.count)
    print(response)
    if response.data.count is None or not bcrypt.check_password_hash(response.data[0]["password"], password):
        return jsonify({"message": "Invalid user credentials"}), 401

    access_token = create_access_token(identity= response.data[0]["username"], expires_delta= timedelta(minutes=45))
    refresh_token = create_refresh_token(identity=response.data[0]["username"])

    return jsonify({
        "message": "Login successfull",
        "access_token": access_token,
        "refresh_token": refresh_token
    }), 200

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(current_user, expires_delta=timedelta(minutes=45))

    return jsonify({
        "message": "Refreshed token",
        "access_token": new_access_token
    }), 200

