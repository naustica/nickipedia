from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_dropzone import Dropzone
from flask_cors import CORS


db = SQLAlchemy()
bcrypt = Bcrypt()
dropzone = Dropzone()
login_manager = LoginManager()


def create_app():

    app = Flask(__name__)
    CORS(app)

    app.config.from_object('data.config.DevelopementConfig')

    db.init_app(app)
    bcrypt.init_app(app)
    dropzone.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'login'

    from data.website import views
    app.register_blueprint(views.bp)

    from data.api import routes
    app.register_blueprint(routes.bp)

    return app
