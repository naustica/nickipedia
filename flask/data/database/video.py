from data import db


class Video(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    root = db.Column(db.Text)
    title = db.Column(db.String(128))
    text = db.Column(db.Text)
    comments = db.relationship('Comment', backref='user', lazy=True)

    def __init__(self, author_id, root, title, text):
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
