from flask import jsonify
from utils.errors import AppError
import psycopg2

def register_error_handlers(app):

    # Handle custom app errors
    @app.errorhandler(AppError)
    def handle_custom_errors(e):
        return jsonify({
            "status": "error",
            "message": e.message
        }), e.status_code

    # Handle psycopg2 errors (DB failures)
    @app.errorhandler(psycopg2.Error)
    def handle_psycopg_errors(e):
        return jsonify({
            "status": "error",
            "message": "Database operation failed",
            "details": str(e)
        }), 500

    # Handle ALL unhandled errors
    @app.errorhandler(Exception)
    def handle_general_error(e):
        return jsonify({
            "status": "error",
            "message": "Something went wrong",
            "details": str(e)
        }), 500
