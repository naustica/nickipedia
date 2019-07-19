import os


basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig:
    HOST = '0.0.0.0'
    SECRET_KEY = "1und1"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DROPZONE_ALLOWED_FILE_TYPE = 'video' and 'image'
    DROPZONE_MAX_FILES = 1
    DROPZONE_TIMEOUT = 10000
    DROPZONE_DEFAULT_MESSAGE = 'drop files here to upload'


class DevelopementConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
