from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_dropzone import Dropzone

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.config['SECRET_KEY'] = "1und1"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DROPZONE_ALLOWED_FILE_TYPE'] = 'video' and 'image'
app.config['DROPZONE_MAX_FILES'] = 1
app.config['DROPZONE_TIMEOUT'] = 10000
app.config['DROPZONE_DEFAULT_MESSAGE'] = 'drop files here to upload'

app.app_context().push()

db = SQLAlchemy()
db.init_app(app)

bcrypt = Bcrypt(app)
dropzone = Dropzone(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


from data import views
