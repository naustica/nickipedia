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
    login_manager.login_view = 'views.login'

    from data.website.views import login
    app.register_blueprint(login.bp)

    from data.website.views import register
    app.register_blueprint(register.bp)

    from data.website.views import video
    app.register_blueprint(video.bp)

    from data.website.views import user
    app.register_blueprint(user.bp)

    from data.website.views import home
    app.register_blueprint(home.bp)

    from data.website.views import result
    app.register_blueprint(result.bp)

    from data.website.views import helpers
    app.register_blueprint(helpers.bp)

    from data.website.views import response
    app.register_blueprint(response.bp)

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

    return app
