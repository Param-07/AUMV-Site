from flask import Blueprint
from controllers.gallery_controller import get_gallery, upload_gallery_item, delete_gallery_item
gallery_bp = Blueprint('gallery_bp', __name__)

gallery_bp.add_url_rule('/', view_func=get_gallery, methods=['GET'])
gallery_bp.add_url_rule('/upload', view_func=upload_gallery_item, methods=['POST'])
gallery_bp.add_url_rule('/delete/<int:id>', view_func=delete_gallery_item, methods=['DELETE'])
