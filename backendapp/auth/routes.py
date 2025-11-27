from datetime import timedelta
from flask_bcrypt import Bcrypt
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from data.queries import _fetch_one

bcrypt = Bcrypt()
auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
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

    access_token = create_access_token(identity=user["username"], expires_delta=timedelta(minutes=45))
    refresh_token = create_refresh_token(identity=user["username"])

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "username": user["username"]
    }), 200

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user, expires_delta=timedelta(minutes=45))
    return jsonify({
        "message": "Refreshed token",
        "access_token": new_access_token
    }), 200
