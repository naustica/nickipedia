from flask import Blueprint, render_template, request, flash, redirect, url_for, session
from flask_login import login_user, logout_user, login_required, current_user
from data import login_manager
from data.database.user import User
from data.website.forms import LoginForm
import requests
from flask_jwt_extended import decode_token


bp = Blueprint('login', __name__, template_folder='./../templates', static_folder='./../static', static_url_path='website/static', url_prefix='/')


@bp.route('/login', methods=['GET', 'POST'])
def login():

    current_page_title = 'login'

    loginform = LoginForm()
    if loginform.validate_on_submit():
        data = {'username': loginform.username.data, 'password': 'test'}
        r = requests.post('http://127.0.0.1:5000' + url_for('auth_api.login'), json=data).json()
        if r['status'] == 'success':
            jwt_decoded = decode_token(r['access_token'])
            user = User.query.filter_by(username=jwt_decoded['identity']).first()
            login_user(user)
            session[current_user.username] = r['access_token']
            flash('logged in successfully')
            return redirect(url_for('home.index'))
        else:
            flash('registration api error, maybe url host')
            flash(r)

        next = request.args.get('next')
        return redirect(next or url_for('login.login'))

    return render_template('login.html', current_page_title=current_page_title, loginform=loginform)


@bp.route('logout')
@login_required
def logout():
    headers = {'Authorization': session[current_user.username]}
    requests.post('http://127.0.0.1:5000' + url_for('auth_api.logout'), headers=headers)

    logout_user()
    return redirect(url_for('login.login'))
