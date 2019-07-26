import os


basedir = os.path.abspath(os.path.dirname(__file__))
upload_path = os.getcwd() + '/data/database/files/'
local_files_path = 'http://0.0.0.0:8000/'
local_server = 'http://127.0.0.1:5000/'


class BaseConfig:
    HOST = '0.0.0.0'
    SECRET_KEY = os.environ['SECRET_KEY']
    JWT_SECRET_KEY = os.environ['SECRET_KEY']
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAX_CONTENT_LENGTH = 100 * 1024 * 1024
    DROPZONE_ALLOWED_FILE_TYPE = 'video' and 'image'
    DROPZONE_MAX_FILES = 1
    DROPZONE_TIMEOUT = 10000
    DROPZONE_DEFAULT_MESSAGE = 'drop files here to upload'


class DevelopementConfig(BaseConfig):
    DEBUG = True
    DEVELOPMENT = True
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
