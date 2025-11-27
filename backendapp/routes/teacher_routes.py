from flask import Blueprint
from controllers.teacher_controller import get_teachers, get_teacher, create_teacher, update_teacher, delete_teacher

teacher_bp = Blueprint('teacher_bp', __name__)

teacher_bp.add_url_rule('/', view_func=get_teachers, methods=['GET'])
teacher_bp.add_url_rule('/addTeacher', view_func=create_teacher, methods=['POST'])
teacher_bp.add_url_rule('/<int:id>', view_func=get_teacher, methods=['GET'])
teacher_bp.add_url_rule('/edit/<int:id>', view_func=update_teacher, methods=['PUT'])
teacher_bp.add_url_rule('/delete/<int:id>', view_func=delete_teacher, methods=['DELETE'])
