from data import db
from sqlalchemy import func


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    video_id = db.Column(db.Integer, db.ForeignKey('videos.id'))
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, server_default=func.now())

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

    @staticmethod
    def get_all():
        return Comment.query.all()

    def __repr__(self):
        return '<Comment: {}'.format(self.content)
