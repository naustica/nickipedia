from data import db, ma, login_manager, bcrypt
from marshmallow import post_load, pre_load, validates, ValidationError
import os


class User(db.Model):
    __tablename__ = 'users'
    username = db.Column(db.String(32), primary_key=True, unique=True, nullable=False)
    email = db.Column(db.String(128), unique=False, nullable=False)
    password = db.Column(db.String(), nullable=False)
    authenticated = db.Column(db.Boolean(), default=None)
    profil_picure = db.Column(db.String(), default=os.getcwd() + '/data/database/files/default/default_pic_a.jpg', nullable=False)
    token = db.relationship('Token', backref='access_token', cascade='all,delete', lazy=True)
    comments = db.relationship('Comment', backref='author', cascade='all,delete', lazy=True)
    videos = db.relationship('Video', backref='owner', cascade='all,delete', lazy=True)

    def __init__(self, username, email, password, authenticated=False):
        self.username = username
        self.email = email
        self.password = password
        self.authenticated = authenticated

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        db.session.commit()

    def is_active(self):
        return True

    def get_id(self):
        return self.username

    def is_authenticated(self):
        self.authenticated

    def is_anonymous(self):
        return False

    def __repr__(self):
        return '{}'.format(self.username)

    @staticmethod
    def get_all():
        return User.query.all()

    @staticmethod
    def username_exists(username):
        if User.query.get(username):
            return True
        else:
            return False


class UserSchema(ma.Schema):
    username = ma.String(required=True)
    email = ma.String(required=True)
    password = ma.String(required=True, load_only=True)

    @pre_load
    def process_input(self, data):
        if data.get('password'):
            password = data['password']
            data['password'] = bcrypt.generate_password_hash(password).decode('utf-8')
        return data

    @post_load
    def load_user(self, data):
        return User(**data)

    @validates('username')
    def validate_username(self, username):
        if User.username_exists(username):
            raise ValidationError('username exists')


@login_manager.user_loader
def load_user(username):
    return User.query.get(username)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
