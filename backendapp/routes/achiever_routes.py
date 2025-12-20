from flask import Blueprint
from controllers.achiever_controller import get_achievers, create_achiever, update_achiever, delete_achiever
achiever_bp = Blueprint('achiever_bp', __name__)

achiever_bp.add_url_rule('/getAchievers', view_func=get_achievers, methods=['GET'])
achiever_bp.add_url_rule('/addAchiever', view_func=create_achiever, methods=['POST'])
achiever_bp.add_url_rule('/editAchiever/<int:id>', view_func=update_achiever, methods=['PUT'])
achiever_bp.add_url_rule('/deleteAchiever/<int:id>', view_func=delete_achiever, methods=['DELETE'])