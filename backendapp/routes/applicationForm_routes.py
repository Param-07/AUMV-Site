from flask import Blueprint
from controllers.applicationForm_controller import admissionForm, inquiryForm, campusVisitForm, formData, deleteFormData, markAsReadFormData
application_bp = Blueprint('application_bp', __name__)

application_bp.add_url_rule('/formData/<tableName>', view_func=formData, methods = ['GET'])
application_bp.add_url_rule('/admissionForm', view_func=admissionForm, methods=['POST'])
application_bp.add_url_rule('/inquiryForm', view_func=inquiryForm, methods=['POST'])
application_bp.add_url_rule('/campusVisitForm', view_func=campusVisitForm, methods=['POST'])
application_bp.add_url_rule('/edit/<id>/<tableName>', view_func=markAsReadFormData, methods=['PUT'])
application_bp.add_url_rule('/delete/<id>/<tableName>', view_func=deleteFormData, methods=['DELETE'])
