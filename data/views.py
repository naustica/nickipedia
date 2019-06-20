from data import app, login_manager
from flask_login import login_user, logout_user, login_required
from flask import render_template, request, flash, redirect, url_for
from werkzeug import secure_filename
from data.models import User, Post
from data.models import db
from data.utils import add_search, add_login, add_register

@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
@add_login
def login():

    from data.utils import loginform
    
    return render_template('login.html', loginform=loginform)


@app.route('/home', methods=['GET', 'POST'])
@add_search
def index():
    posts = Post.query.all()

    from data.utils import searchform

    return render_template('index.html', posts=posts, searchform=searchform)


@app.route('/user/<name>', methods=['GET', 'POST'])
@login_required
@add_search
def user(name):

    from data.utils import searchform

    return render_template('user.html', name=name, searchform=searchform)

@app.route('/register', methods = ['GET', 'POST'])
@login_required
@add_search
@add_register
def register():

    from data.utils import registrationform, searchform

    return render_template('register.html', title='Register', registrationform=registrationform, searchform=searchform)

@app.route('/upload', methods = ['GET', 'POST'])
@login_required
@add_search
def upload():

    from data.utils import searchform

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
