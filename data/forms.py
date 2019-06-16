from wtforms import Form, StringField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from flask import flash
from data.models import User

class Search(Form):
    search = StringField('')

class RegistrationForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=2, max=64)])

    submit = SubmitField('sign up')

    def validate_username(self, username):

        user = User.query.filter_by(username=username.data).first()

        if user:
            flash('get rekt username taken')
            raise ValueError('username taken')

class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=2, max=64)])

    submit = SubmitField('login')
