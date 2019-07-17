from data import app, login_manager
from flask_login import login_user, logout_user, login_required, current_user
from flask import render_template, request, flash, redirect, url_for
from data.models import User, Comment, Video
from data.models import db
from sqlalchemy import desc
from data.forms import CommentForm, SearchForm, LoginForm, RegistrationForm


@app.route('/login', methods=['GET', 'POST'])
def login():

    loginform = LoginForm()
    if loginform.validate_on_submit():
        user = User.query.filter_by(username=loginform.username.data).first()
        login_user(user)
        flash('logged in successfully')

        next = request.args.get('next')
        return redirect(next or url_for('index'))

    return render_template('login.html', loginform=loginform)


@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
@login_required
def index():

    searchform = SearchForm()
    if searchform.validate_on_submit():
        search = User.query.filter_by(username=request.form['search']).first()
        return redirect(url_for('result', search=search.username))

    current_page = 'index'

    return render_template('index.html', searchform=searchform, current_page=current_page)


@app.route('/user/<name>', methods=['GET', 'POST'])
@login_required
def user(name):

    current_page = 'user'

    return render_template('user.html', name=name, current_page=current_page)


@app.route('/register', methods=['GET', 'POST'])
def register():

    registrationform = RegistrationForm()
    if registrationform.validate_on_submit():
        user = User(username=registrationform.username.data)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        flash('account created for {}'.format(registrationform.username.data))
        return redirect(url_for('index'))

    return render_template('register.html', title='Register', registrationform=registrationform)


@app.route('/watch/<video_id>', methods=['GET', 'POST'])
def video(video_id):

    current_page = 'video'

    video = Video.query.filter_by(id=video_id).first()

    if video is None:
        return redirect(404)

    root = video.root

    video_title = video.title

    video_author = User.query.filter_by(id=video.author_id).first()

    video_description = video.text

    comments = Comment.query.filter_by(video_id=video_id).order_by(desc(Comment.id)).all()

    commentform = CommentForm()
    if commentform.validate_on_submit():
        comment = Comment(author_id=current_user.get_id(), video_id=video_id, content=commentform.content.data)
        db.session.add(comment)
        db.session.commit()
        flash('posted')
        return redirect(url_for('video', video_id=video_id))

    return render_template('watch.html', video_id=video_id, comments=comments,
                            commentform=commentform, root=root, video_title=video_title,
                            video_description=video_description, video_author=video_author,
                            current_page=current_page)


@app.route('/result/<search>', methods=['GET', 'POST'])
def result(search):

    current_page = 'result'

    return render_template('results.html', search=search, current_page=current_page)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect(url_for('login'))


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/reset')
def reset():
    db.drop_all()
    db.create_all()
    return redirect(url_for('register'))
