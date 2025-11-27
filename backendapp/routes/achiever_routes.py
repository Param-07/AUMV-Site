from flask import Blueprint
from controllers.achiever_controller import get_achievers
achiever_bp = Blueprint('achiever_bp', __name__)
achiever_bp.add_url_rule('/getAchievers', view_func=get_achievers, methods=['GET'])
