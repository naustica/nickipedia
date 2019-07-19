from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from data.models import db, User, Comment, Video
from data import login_manager
from sqlalchemy import desc
from data.website.forms import CommentForm, SearchForm, LoginForm, RegistrationForm
from requests import put, get


bp = Blueprint("views", __name__, template_folder='templates', static_folder='static', static_url_path='views/static', url_prefix='/')


@bp.route('/login', methods=['GET', 'POST'])
def login():

    current_page = 'login'

    loginform = LoginForm()
    if loginform.validate_on_submit():
        user = User.query.filter_by(username=loginform.username.data).first()
        login_user(user)
        flash('logged in successfully')

        next = request.args.get('next')
        return redirect(next or url_for('views.index'))

    return render_template('login.html', current_page=current_page, loginform=loginform)


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/home', methods=['GET', 'POST'])
@login_required
def index():

    searchform = SearchForm()
    if searchform.validate_on_submit():
        return redirect(url_for('views.result', search=request.form['search']))

    current_page = 'index'

    return render_template('index.html', searchform=searchform, current_page=current_page)


@bp.route('/user/<name>', methods=['GET', 'POST'])
@login_required
def user(name):

    current_page = 'user'

    return render_template('user.html', name=name, current_page=current_page)


@bp.route('/register', methods=['GET', 'POST'])
def register():

    current_page = 'registration'

    registrationform = RegistrationForm()
    if registrationform.validate_on_submit():
        user = User(username=registrationform.username.data)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        flash('account created for {}'.format(registrationform.username.data))
        return redirect(url_for('views.index'))

    return render_template('register.html', title='registration', current_page=current_page, registrationform=registrationform)


@bp.route('/watch/<video_id>', methods=['GET', 'POST'])
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

    suggestions = Video.query.filter(Video.id != video_id).all()

    commentform = CommentForm()
    if commentform.validate_on_submit():
        comment = Comment(author_id=current_user.get_id(), video_id=video_id, content=commentform.content.data)
        db.session.add(comment)
        db.session.commit()
        flash('posted')
        return redirect(url_for('views.video', video_id=video_id))

    return render_template('watch.html', video_id=video_id, comments=comments,
                            commentform=commentform, root=root, video_title=video_title,
                            video_description=video_description, video_author=video_author,
                            current_page=current_page, suggestions=suggestions)


@bp.route('/result/<search>', methods=['GET', 'POST'])
def result(search):

    current_page = 'result'

    search_term = search

    search = Video.query.filter(Video.title.like('{}{}{}'.format('%', search, '%'))).all()

    return render_template('results.html', search=search, current_page=current_page, search_term=search_term)


@bp.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect(url_for('views.login'))


@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.login'))


@bp.route('/reset')
def reset():
    db.drop_all()
    db.create_all()
    return redirect(url_for('views.register'))
