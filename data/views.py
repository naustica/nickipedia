from data import app, login_manager
from flask_login import login_user, logout_user, login_required
from flask import render_template, request, flash, redirect, url_for
from werkzeug import secure_filename
from data.forms import SearchForm, RegistrationForm, LoginForm
from data.models import User, Post
from data.models import db


@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def index():
    posts = Post.query.all()
    searchform = SearchForm()
    if searchform.validate_on_submit():
        search = User.query.filter_by(username=request.form['search']).first()
        return redirect(url_for('user', name=search.username))

    loginform = LoginForm()
    if loginform.validate_on_submit():
        user = User.query.filter_by(username=loginform.username.data).first()
        login_user(user)
        flash('logged in successfully')

        next = request.args.get('next')
        return redirect(next or url_for('index'))

    return render_template('index.html', posts=posts, searchform=searchform, loginform=loginform)


@app.route('/user/<name>', methods=['GET', 'POST'])
@login_required
def user(name):
    searchform = SearchForm()
    if searchform.validate_on_submit():
        search = User.query.filter_by(username=request.form['search']).first()
        return redirect(url_for('user', name=search.username))

    return render_template('user.html', name=name, searchform=searchform)

@app.route('/register', methods = ['GET', 'POST'])
@login_required
def register():
    searchform = SearchForm()
    if searchform.validate_on_submit():
        search = User.query.filter_by(username=request.form['search']).first()
        return redirect(url_for('user', name=search.username))
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
def upload():
    searchform = SearchForm()
    if searchform.validate_on_submit():
        search = User.query.filter_by(username=request.form['search']).first()
        return redirect(url_for('user', name=search.username))
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
    return redirect(url_for('index'))
