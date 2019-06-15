from data import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return '{}{}'.format('User: ', self.username)

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    content = db.Column(db.Text)

    def __repr__(self):
        return '{}{}'.format('Post: ', self.content)
