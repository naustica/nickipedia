from data import db, ma
from marshmallow import post_load
from sqlalchemy import func


class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer(), primary_key=True, nullable=False)
    author_id = db.Column(db.String(), db.ForeignKey('users.username'), nullable=False)
    root = db.Column(db.Text(), default='dummy', nullable=False)
    filename = db.Column(db.Text(), default='dummy', nullable=False)
    title = db.Column(db.String(128), nullable=False)
    text = db.Column(db.Text(), nullable=True)
    timestamp = db.Column(db.DateTime(), server_default=func.now(), nullable=False)
    comments = db.relationship('Comment', backref='user', lazy=True)

    def __init__(self, author_id, title, text, root='dummy'):
        self.author_id = author_id
        self.root = root
        self.title = title
        self.text = text

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Video.query.all()

    def __repr__(self):
        return '<Video: {}'.format(self.title)


class VideoSchema(ma.Schema):
    id = ma.Integer(required=False, dump_only=True)
    author_id = ma.String(required=True)
    title = ma.String(required=True)
    text = ma.String(required=True)
    timestamp = ma.DateTime(required=False, dump_only=True)

    @post_load
    def load_video(self, data):
        return Video(**data)


video_schema = VideoSchema()
videos_schema = VideoSchema(many=True)
