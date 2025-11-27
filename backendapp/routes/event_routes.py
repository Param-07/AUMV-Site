from flask import Blueprint
from controllers.event_controller import get_events, get_event, create_event, update_event, delete_event

event_bp = Blueprint('event_bp', __name__)

event_bp.add_url_rule('/', view_func=get_events, methods=['GET'])
event_bp.add_url_rule('/addEvents', view_func=create_event, methods=['POST'])
event_bp.add_url_rule('/get/<int:id>', view_func=get_event, methods=['GET'])
event_bp.add_url_rule('/edit/<int:id>', view_func=update_event, methods=['PUT'])
event_bp.add_url_rule('/delete/<int:id>', view_func=delete_event, methods=['DELETE'])
