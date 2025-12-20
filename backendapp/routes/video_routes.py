from flask import Blueprint
from controllers.video_controller import get_videos, upload_video, delete_video

video_bp = Blueprint('video_bp', __name__)

video_bp.add_url_rule('/getVideos', view_func=get_videos, methods=['GET'])
video_bp.add_url_rule('/addVideo', view_func=upload_video, methods=['POST'])
video_bp.add_url_rule('/deleteVideo/<int:id>', view_func=delete_video, methods=['DELETE'])