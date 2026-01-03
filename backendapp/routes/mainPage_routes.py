from flask import Blueprint
from controllers.mainPage_controller import get_hero, create_hero, update_hero, delete_hero

mainPage_bp = Blueprint('mainPage_bp', __name__)

mainPage_bp.add_url_rule('/getHero', view_func=get_hero, methods=['GET'])
mainPage_bp.add_url_rule('/addHero', view_func=create_hero, methods=['POST'])
mainPage_bp.add_url_rule('/editHero/<int:id>', view_func=update_hero, methods=['PUT'])
mainPage_bp.add_url_rule('/deleteHero/<int:id>', view_func=delete_hero, methods=['DELETE'])
