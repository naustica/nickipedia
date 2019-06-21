from data import app, login_manager
from flask_login import login_user, logout_user, login_required
from flask import render_template, request, flash, redirect, url_for
from werkzeug import secure_filename
from data.models import User, Post
from data.models import db
from data.utils import add_search, add_login, add_register, add_compose_poop
from sqlalchemy import desc

@app.route('/login', methods=['GET', 'POST'])
@add_login
def login():

    from data.utils import loginform

    return render_template('login.html', loginform=loginform)


@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
@login_required
@add_search
@add_compose_poop
def index():
    posts = Post.query.order_by(desc(Post.id)).all()

    from data.utils import searchform, poopform

    return render_template('index.html', posts=posts, searchform=searchform, poopform=poopform)


@app.route('/user/<name>', methods=['GET', 'POST'])
@login_required
@add_search
@add_compose_poop
def user(name):

    from data.utils import searchform, poopform

    return render_template('user.html', name=name, searchform=searchform, poopform=poopform)

@app.route('/register', methods = ['GET', 'POST'])
@add_register
def register():

    from data.utils import registrationform

    return render_template('register.html', title='Register', registrationform=registrationform)

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
    return redirect(url_for('login'))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))
