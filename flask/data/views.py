from data import app, login_manager
from flask_login import login_user, logout_user, login_required
from flask import render_template, request, flash, redirect, url_for
from data.models import User, Comment, Video
from data.models import db
from data.utils import add_search, add_login, add_register, add_comment_composer, add_uploader
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
def index():

    from data.utils import searchform

    current_page = 'index'

    return render_template('index.html', searchform=searchform, current_page=current_page)


@app.route('/user/<name>', methods=['GET', 'POST'])
@login_required
@add_search
@add_comment_composer
@add_uploader
def user(name):

    from data.utils import searchform, commentform

    current_page = 'user'

    return render_template('user.html', name=name, searchform=searchform,
                            commentform=commentform, current_page=current_page)


@app.route('/register', methods=['GET', 'POST'])
@add_register
def register():

    from data.utils import registrationform

    return render_template('register.html', title='Register', registrationform=registrationform)


@app.route('/watch/<video_id>', methods=['GET', 'POST'])
@add_comment_composer
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

    from data.utils import commentform

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
