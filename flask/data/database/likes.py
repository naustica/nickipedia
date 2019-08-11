from data import db, ma
from marshmallow import post_load


class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer(), primary_key=True, nullable=False)
    author_id = db.Column(db.String(), db.ForeignKey('users.username'), nullable=False)
    video_id = db.Column(db.Integer(), db.ForeignKey('videos.id'), nullable=False)
    like = db.Column(db.Integer(), nullable=False, default=0)
    dislike = db.Column(db.Integer(), nullable=False, default=0)

    def __init__(self, video_id, author_id='', like=0, dislike=0):
        self.video_id = video_id
        self.author_id = author_id
        self.like = like
        self.dislike = dislike

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

    def __repr__(self):
        return 'Like: {}'.format(self.id)


class LikeSchema(ma.Schema):
    id = ma.Integer(required=False, dump_only=True)
    video_id = ma.Integer(required=True)
    author_id = ma.String(required=True, dump_only=True)
    like = ma.Integer(required=True)
    dislike = ma.Integer(required=True)

    @post_load
    def load_like(self, data):
        return Like(**data)


like_schema = LikeSchema()
likes_schema = LikeSchema(many=True)
