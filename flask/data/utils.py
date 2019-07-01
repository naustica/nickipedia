from data.forms import SearchForm, RegistrationForm, LoginForm, PoopForm
from functools import wraps
from data.models import db
from data.models import User, Post
from flask import request, flash, redirect, url_for
from flask_login import login_user, current_user
import os
from data import basedir
from werkzeug import secure_filename
import time


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
            login_user(user)
            flash('account created for {}'.format(registrationform.username.data))
            return redirect(url_for('index'))
        return function(*args, **kwargs)
    return wrapper

def add_compose_poop(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        global poopform
        poopform = PoopForm()
        if poopform.validate_on_submit():
            post = Post(author_id=current_user.get_id(), content=poopform.content.data)
            db.session.add(post)
            db.session.commit()
            flash('posted')
        poopform = PoopForm(formdata=None)
        return function(*args, **kwargs)
    return wrapper

def add_uploader(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if request.method == 'POST':
            try:
                f = request.files.get('file')
                f.save(os.path.join(basedir, 'uploads/') + secure_filename(f.filename))
                time.sleep(1)
                flash('uploaded')
            except:
                flash('error-image-uploading')
        return function(*args, **kwargs)
    return wrapper
