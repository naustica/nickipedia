from data import db, ma
from marshmallow import post_load
from sqlalchemy import func
import os
from data.database.likes import LikeSchema
from data.database.comment import CommentSchema


class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer(), primary_key=True, nullable=False)
    author_id = db.Column(db.String(), db.ForeignKey('users.username'), nullable=False)
    root = db.Column(db.String(), default='', nullable=False)
    filename = db.Column(db.String(), default='', nullable=False)
    duration = db.Column(db.String(), nullable=True)
    public = db.Column(db.Boolean(), nullable=True, default=False)
    title = db.Column(db.String(128), nullable=False)
    text = db.Column(db.Text(), nullable=True)
    views = db.Column(db.Integer(), nullable=False, default=0)
    thumbnail = db.Column(db.String(), default=os.getcwd() + '/data/database/files/default/default_thumbnail.jpg', nullable=True)
    hashtags = db.Column(db.String(), nullable=True)
    original_author = db.Column(db.String(), nullable=True)
    original_views = db.Column(db.Integer(), nullable=True)
    timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    comments = db.relationship('Comment', backref='user', cascade='all,delete', lazy=True)
    voting = db.relationship('Like', backref='votes', cascade='all,delete', lazy=True)

    def __init__(self, author_id, title, text, duration=None, root=None, filename=None):
        self.author_id = author_id
        self.root = root
        self.title = title
        self.text = text
        self.duration = duration
        self.filename = filename

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

    @staticmethod
    def get_all():
        return Video.query.all()

    @staticmethod
    def get_all_public():
        return Video.query.filter_by(public=True).all()

    @staticmethod
    def get_all_private():
        return Video.query.filter_by(public=False).all()

    def __repr__(self):
        return 'Video: {}'.format(self.title)


class VideoSchema(ma.Schema):
    id = ma.Integer(required=False, dump_only=True)
    author_id = ma.String(required=True)
    title = ma.String(required=True)
    text = ma.String(required=True)
    filename = ma.String(required=True)
    public = ma.Boolean(required=False)
    duration = ma.String(required=True)
    views = ma.Integer(required=False, dump_only=True)
    timestamp = ma.DateTime(required=False, dump_only=True)
    thumbnail = ma.String(required=False)
    original_author = ma.String(required=False)
    original_views = ma.Integer(required=False)
    hashtags = ma.String(required=False)
    voting = ma.Nested(LikeSchema, many=True, only=('id', 'like', 'dislike'))
    comments = ma.Nested(CommentSchema, many=True, only=('id', 'content', 'timestamp'))

    @post_load
    def load_video(self, data):
        return Video(**data)


video_schema = VideoSchema()
videos_schema = VideoSchema(many=True)
