from flask import request, jsonify
from services.applicationForm_service import createAdmissionRequest, createInquiryRequest, createCampusVisitRequest, getFormRequest, deleteFormRequest, markAsReadRequest

def formData(tableName):
    try:
        response = getFormRequest(tableName)
        return jsonify({"data" : response})
    except Exception as exc:
        return jsonify({'error': str(exc)})
    
def admissionForm():
    try:
        data = request.form.to_dict()
        response = createAdmissionRequest(data)
        return jsonify({"message": response}), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500
    
def campusVisitForm():
    try:
        data = request.form.to_dict()
        response = createCampusVisitRequest(data)
        return jsonify({'message': response})
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500
    
def inquiryForm():
    try:
        data = request.form.to_dict()
        response = createInquiryRequest(data)
        return jsonify({'message': response}), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500
    
def markAsReadFormData(id, tableName):
    try:
        response = markAsReadRequest(id, tableName)
        return jsonify({'message': response}), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500
    
def deleteFormData(id, tableName):
    try:
        resposne = deleteFormRequest(id, tableName)
        return jsonify({'message': resposne}), 200
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500