import os


basedir = os.path.abspath(os.path.dirname(__file__))
upload_path = os.getcwd() + '/data/database/files/'
local_files_path = os.environ['LOCAL_FILES_PATH']
local_server_adress = os.environ['LOCAL_SERVER_ADRESS']


class BaseConfig:
    DEBUG = False
    TESTING = False
    HOST = '0.0.0.0'
    SECRET_KEY = os.environ['SECRET_KEY']
    JWT_SECRET_KEY = os.environ['SECRET_KEY']
    MAIL_SERVER = os.environ['MAIL_SERVER']
    MAIL_PORT = os.environ['MAIL_PORT']
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ['MAIL_USERNAME']
    MAIL_PASSWORD = os.environ['MAIL_PASSWORD']
    MAIL_DEFAULT_SENDER = os.environ['MAIL_DEFAULT_SENDER']
    MAIL_MAX_MAILS = 50
    MAIL_SUPRESS_SEND = False
    MAIL_ASCII_ATTACHMENTS = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAX_CONTENT_LENGTH = 200 * 1024 * 1024


class DevelopementConfig(BaseConfig):
    DEBUG = True
    DEVELOPMENT = True
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
