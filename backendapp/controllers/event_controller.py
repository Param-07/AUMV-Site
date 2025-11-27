from flask import request, jsonify
from flask_jwt_extended import jwt_required
from services.event_service import fetch_events, fetch_event_by_id, add_event, modify_event, remove_event

def get_events():
    try:
        events = fetch_events()
        return jsonify({'events': events}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_event(id):
    try:
        event = fetch_event_by_id(id)
        return jsonify({'event': event}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def create_event():
    try:
        data = request.form.to_dict()
        event = add_event(data)
        return jsonify({'message': 'created', 'event': event}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def update_event(id):
    try:
        data = request.form.to_dict()
        event = modify_event(id, data)
        return jsonify({'message': 'updated', 'event': event}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@jwt_required()
def delete_event(id):
    try:
        remove_event(id)
        return jsonify({'message': 'deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
