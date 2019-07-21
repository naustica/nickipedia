from data import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    comments = db.relationship('Comment', backref='author', lazy=True)
    videos = db.relationship('Video', backref='owner', lazy=True)

    def __init__(self, username):
        self.username = username

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return User.query.all()

    def __repr__(self):
        return '{}'.format(self.username)
