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

    def __repr__(self):
        return '{}'.format(self.username)


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    video_id = db.Column(db.Integer, db.ForeignKey('videos.id'))
    content = db.Column(db.Text)

    def __repr__(self):
        return '{}{}'.format('Comment: ', self.content)


class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    root = db.Column(db.Text)
    title = db.Column(db.String(128))
    text = db.Column(db.Text)
    comments = db.relationship('Comment', backref='user', lazy=True)

    def __repr__(self):
        return '{}{}'.format('Video: ', self.root)
