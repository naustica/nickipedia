from data import db, ma, login_manager


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(32), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=False, nullable=False)
    password = db.Column(db.String, nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    comments = db.relationship('Comment', backref='author', lazy=True)
    videos = db.relationship('Video', backref='owner', lazy=True)

    def __init__(self, username, email, password, authenticated=False):
        self.username = username
        self.email = email
        self.password = password
        self.authenticated = authenticated

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def is_active(self):
        return True

    def get_id(self):
        return self.id

    def is_authenticated(self):
        self.authenticated

    def is_anonymous(self):
        return False

    @staticmethod
    def get_all():
        return User.query.all()

    def __repr__(self):
        return '{}'.format(self.username)


class UserSchema(ma.Schema):
    class Meta:
        fields = ('username', 'email')


@login_manager.user_loader
def load_user(id):
    return User.query.get(id)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
