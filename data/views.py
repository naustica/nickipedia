from data import app
from flask import render_template, request, flash, redirect, url_for
from werkzeug import secure_filename
from data.forms import Search, RegistrationForm, LoginForm
from data.models import User, Post
from data.models import db

@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def index():
    posts = Post.query.all()
    if request.method == 'POST':
        search = User.query.filter_by(username=request.form['search']).first()
        if search == None:
            pass
        else:
            return redirect(url_for('user', name=search.username))

    return render_template('index.html', posts=posts)


@app.route('/user/<name>', methods=['GET', 'POST'])
def user(name):
    return render_template('user.html', name=name)

@app.route('/register', methods = ['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data)
        db.session.add(user)
        db.session.commit()
        flash('account created for {}'.format(form.username.data))
        return redirect(url_for('index'))
    return render_template('register.html', title='Register', form=form)

@app.route('/login', methods = ['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('hi, {}'.format(form.username.data))
        return redirect(url_for('index'))
    return render_template('login.html', title='Login', form=form)

@app.route('/upload')
def upload():
   return render_template('upload.html')

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      f.save('uploads/' + secure_filename(f.filename))
      success = True
      return render_template('upload.html', success=success)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404
