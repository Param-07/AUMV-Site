# auth.py
import os
from datetime import timedelta
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from database.queries import _fetch_one, _execute_and_return

bcrypt = Bcrypt()  
auth_bp = Blueprint("auth", __name__)

# Configurable token lifetimes (in minutes)
ACCESS_EXPIRE_MINUTES = int(os.getenv("ACCESS_EXPIRE_MINUTES", 45))



@auth_bp.route("/register", methods=["POST"])
def register():
    # Expecting form-data or JSON
    username = request.form.get("username") or (request.json or {}).get("username")
    password = request.form.get("password") or (request.json or {}).get("password")
    email = request.form.get("email") or (request.json or {}).get("email")

    if not username or not password or not email:
        return jsonify({"message": "username, password and email are required"}), 400

    existing = _fetch_one(email)
    if existing:
        return jsonify({"message": "Email already exists", "status": 0}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    inserted = _execute_and_return(username, email, password)

    return jsonify({"message": "User registered successfully", "status": 1, "user": inserted}), 200


@auth_bp.route("/login", methods=["POST"])
def login():
    password = request.form.get("password") or (request.json or {}).get("password")
    email = request.form.get("email") or (request.json or {}).get("email")

    if not password or not email:
        return jsonify({"message": "email and password required"}), 400

    user = _fetch_one(email)
    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    # user["password"] is hashed
    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user["username"], expires_delta=timedelta(minutes=ACCESS_EXPIRE_MINUTES))
    refresh_token = create_refresh_token(identity=user["username"])

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "username": user["username"]
    }), 200


# OPTIONS preflight for /auth/refresh (no JWT)
@auth_bp.route("/refresh", methods=["OPTIONS"])
def refresh_options():
    resp = jsonify({"status": "preflight ok"})
    # double ensure the proper CORS headers if needed
    resp.headers.add("Access-Control-Allow-Origin", os.getenv("CORS_ORIGINS", "*"))
    resp.headers.add("Access-Control-Allow-Headers", "Authorization, Content-Type")
    resp.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return resp, 200


# Protected POST route (requires refresh token)
@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user, expires_delta=timedelta(minutes=ACCESS_EXPIRE_MINUTES))
    return jsonify({
        "message": "Refreshed token",
        "access_token": new_access_token
    }), 200
