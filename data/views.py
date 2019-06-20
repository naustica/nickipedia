from data import app, login_manager
from flask_login import login_user, logout_user, login_required
from flask import render_template, request, flash, redirect, url_for
from werkzeug import secure_filename
from data.forms import SearchForm, RegistrationForm, LoginForm
from data.models import User, Post
from data.models import db
from functools import wraps

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

@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
@add_login
def login():

    return render_template('login.html', loginform=loginform)

@app.route('/home', methods=['GET', 'POST'])
@add_search
def index():
    posts = Post.query.all()

    return render_template('index.html', posts=posts, searchform=searchform)


@app.route('/user/<name>', methods=['GET', 'POST'])
@login_required
@add_search
def user(name):
    return render_template('user.html', name=name, searchform=searchform)

@app.route('/register', methods = ['GET', 'POST'])
@login_required
@add_search
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data)
        db.session.add(user)
        db.session.commit()
        flash('account created for {}'.format(form.username.data))
        return redirect(url_for('index'))
    return render_template('register.html', title='Register', form=form, searchform=searchform)

@app.route('/upload', methods = ['GET', 'POST'])
@login_required
@add_search
def upload():
    return render_template('upload.html', searchform=searchform)

@app.route('/uploader', methods = ['GET', 'POST'])
@login_required
def upload_file():
    if request.method == 'POST':
      f = request.files['file']
      f.save('uploads/' + secure_filename(f.filename))
      success = True
      return render_template('upload.html', success=success)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect(url_for('index'))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))
