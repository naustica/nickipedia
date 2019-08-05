from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_dropzone import Dropzone
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
import os


db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()
dropzone = Dropzone()
login_manager = LoginManager()
jwt = JWTManager()


def create_app():

    app = Flask(__name__)
    CORS(app)

    app.config.from_object(os.environ['APP_SETTINGS'])

    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    dropzone.init_app(app)
    jwt.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'main.login'

    from data.website.views import main as website_main_blueprint
    app.register_blueprint(website_main_blueprint)

    from data.api import search
    app.register_blueprint(search.bp)

    from data.api import user
    app.register_blueprint(user.bp)

    from data.api import auth
    app.register_blueprint(auth.bp)

    from data.api import video
    app.register_blueprint(video.bp)

    from data.api import comment
    app.register_blueprint(comment.bp)

    from data.api import likes
    app.register_blueprint(likes.bp)

    return app
