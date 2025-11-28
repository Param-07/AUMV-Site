import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from werkzeug.exceptions import HTTPException
from config import Config
from auth.routes import auth_bp
from routes.teacher_routes import teacher_bp
from routes.event_routes import event_bp
from routes.gallery_routes import gallery_bp
from routes.video_routes import video_bp
from routes.achiever_routes import achiever_bp
from routes.facilities_routes import facilities_bp
import logging

def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    CORS(app)
    JWTManager(app)

    logging.basicConfig(level=logging.DEBUG if app.config['DEBUG'] else logging.INFO,
                        format='%(asctime)s %(levelname)s %(name)s: %(message)s')

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(teacher_bp, url_prefix="/admin/teachers")
    app.register_blueprint(event_bp, url_prefix="/admin/events")
    app.register_blueprint(gallery_bp, url_prefix="/admin/gallery")
    app.register_blueprint(video_bp, url_prefix="/admin/videos")
    app.register_blueprint(achiever_bp, url_prefix="/admin/achievers")
    app.register_blueprint(facilities_bp, url_prefix="/admin/facilities")

    @app.errorhandler(Exception)
    def handle_exception(e):
        if isinstance(e, HTTPException):
            return jsonify({"message": e.description}), e.code
        app.logger.exception("Unhandled exception")
        return jsonify({"message": "Internal Server Error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 8000)), debug=app.config['DEBUG'])
