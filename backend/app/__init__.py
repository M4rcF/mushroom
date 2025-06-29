from flask import Flask
from flask_cors import CORS
from .routes import predict_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["*"])
    app.register_blueprint(predict_blueprint)
    return app


