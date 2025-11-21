import os
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from utils.supabase_client import supabase_client
from database.queries import add_upcoming_event, delete_event_by_id, edit_event, get_data_from_DB
from utils.validators import if_file_exists

event_bp = Blueprint("event_bp", __name__)

@event_bp.route('/getEvents', methods=['GET'])
def get_events_data():
    try:
        response = get_data_from_DB("select * from events;")

        return jsonify({"message": "success",
                        "events": response}), 200
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

@event_bp.route("/addEvents", methods=["POST"], endpoint='post_events_endpoint')
@jwt_required()
def add_events():
    title = request.form.get("title")
    valid_till = request.form.get("valid_till")
    description = request.form.get("description")

    try:
        response = add_upcoming_event(title, valid_till, description)
        return jsonify({"message": "success",
                        "event": response}), 200
    except Exception as exc :
        return jsonify({'error', str(exc)}), 500

@event_bp.route("/edit/Events/<int:id>", methods=["PUT"], endpoint='put_events_endpoint')
@jwt_required()
def edit_events(id):
    title = request.form.get("title")
    valid_till = request.form.get("valid_till")
    description = request.form.get("description")

    try:
        response = edit_event(title, valid_till, description, id)
        return jsonify({"message": "success",
                        "event": response}), 200
    except Exception as exc :
        return jsonify({'error', str(exc)}), 500

@event_bp.route('/delete/Event/<int:id>', methods=['DELETE'], endpoint='delete_event_endpoint')
@jwt_required()
def delete_event(id):
    try:
        response = delete_event_by_id(id)

        return jsonify({"message": response}), 200
    except Exception as exc:
        return jsonify({'message':'deletion failed', 'error': str(exc)}), 500