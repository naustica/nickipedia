from data import db, ma
from sqlalchemy import func
from marshmallow import post_load


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer(), primary_key=True, nullable=False)
    author_id = db.Column(db.String(), db.ForeignKey('users.username'), nullable=False)
    video_id = db.Column(db.Integer(), db.ForeignKey('videos.id'), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    timestamp = db.Column(db.DateTime(), server_default=func.now(), nullable=False)

    def __init__(self, author_id, video_id, content):
        self.content = content
        self.author_id = author_id
        self.video_id = video_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<Comment: {}'.format(self.content)


class CommentSchema(ma.Schema):
    id = ma.Integer(required=False, dump_only=True)
    video_id = ma.Integer(required=True)
    author_id = ma.String(required=True)
    content = ma.String(required=True)
    timestamp = ma.DateTime(required=False, dump_only=True)

    @post_load
    def load_comment(self, data):
        return Comment(**data)


comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
