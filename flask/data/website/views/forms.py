from wtforms import StringField, SubmitField, TextField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from flask import flash
from data.database.user import User
from data.database.video import Video


class SearchForm(FlaskForm):
    search = StringField('search:', validators=[DataRequired(), Length(min=2, max=64)])

    submit = SubmitField('search')

    def validate_search(self, search):

        search = Video.query.filter(Video.title.ilike('{}{}{}'.format('%', search.data, '%'))).first()

        if search is None:
            flash('get rekt no results')
            raise ValueError('no results')


class RegistrationForm(FlaskForm):

    username = StringField('username:', validators=[DataRequired(), Length(min=2, max=64)])

    submit = SubmitField('sign up')

    def validate_username(self, username):

        user = User.query.filter_by(username=username.data).first()

        if user:
            flash('get rekt username taken')
            raise ValueError('username taken')


class LoginForm(FlaskForm):

    username = StringField('username:', validators=[DataRequired(), Length(min=2, max=64)])

    submit = SubmitField('login')

    def validate_username(self, username):

        user = User.query.filter_by(username=username.data).first()

        if user is None:
            flash('get rekt username dont exist')
            raise ValueError('username dont exist')


class CommentForm(FlaskForm):

    content = TextField('', validators=[DataRequired(), Length(min=1, max=80)])

    submit = SubmitField('posten')

    def validate_content(self, content):

        pass
