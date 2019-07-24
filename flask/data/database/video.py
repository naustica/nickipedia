from data import db, ma


class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer(), primary_key=True, nullable=False)
    author_id = db.Column(db.String(), db.ForeignKey('users.username'), nullable=False)
    root = db.Column(db.Text(), default='dummy', nullable=False)
    filename = db.Column(db.Text(), default='dummy', nullable=False)
    title = db.Column(db.String(128), nullable=False)
    text = db.Column(db.Text(), nullable=True)
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
    class Meta:
        fields = ('id', 'author_id', 'title', 'text')


video_schema = VideoSchema()
videos_schema = VideoSchema(many=True)
