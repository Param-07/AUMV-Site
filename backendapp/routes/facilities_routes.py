from flask import Blueprint
from controllers.facilities_controller import get_facilities, create_facilities, delete_facilities

facilities_bp = Blueprint('faclities_bp', __name__)

facilities_bp.add_url_rule('/', view_func=get_facilities, methods=['GET'])
facilities_bp.add_url_rule('/addFacilities', view_func=create_facilities, methods=['POST'])
facilities_bp.add_url_rule('/delete/<int:id>', view_func=delete_facilities, methods=['DELETE'])
