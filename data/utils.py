from data.forms import SearchForm, RegistrationForm, LoginForm
from functools import wraps
from data.models import db
from data.models import User, Post
from flask import request, flash, redirect, url_for
from flask_login import login_user

def add_search(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        global searchform
        searchform = SearchForm()
        if searchform.validate_on_submit():
            search = User.query.filter_by(username=request.form['search']).first()
            return redirect(url_for('user', name=search.username))
        return function(*args, **kwargs)
    return wrapper

def add_login(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        global loginform
        loginform = LoginForm()
        if loginform.validate_on_submit():
            user = User.query.filter_by(username=loginform.username.data).first()
            login_user(user)
            flash('logged in successfully')

            next = request.args.get('next')
            return redirect(next or url_for('index'))
        return function(*args, **kwargs)
    return wrapper

def add_register(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        global registrationform
        registrationform = RegistrationForm()
        if registrationform.validate_on_submit():
            user = User(username=registrationform.username.data)
            db.session.add(user)
            db.session.commit()
            flash('account created for {}'.format(registrationform.username.data))
            return redirect(url_for('index'))
        return function(*args, **kwargs)
    return wrapper
