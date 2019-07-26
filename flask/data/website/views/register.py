from flask import Blueprint, render_template, flash, redirect, url_for, session
from flask_login import login_user, current_user
from data.database.user import User
from data.website.forms import RegistrationForm
import requests
from flask_jwt_extended import decode_token


bp = Blueprint('register', __name__, template_folder='./../templates', static_folder='./../static', static_url_path='website/static', url_prefix='/')


@bp.route('/register', methods=['GET', 'POST'])
def register():

    current_page_title = 'registration'

    registrationform = RegistrationForm()
    if registrationform.validate_on_submit():
        data = {'username': registrationform.username.data, 'email': 'lul@kek.de', 'password': 'test'}
        r = requests.post('http://127.0.0.1:5000' + url_for('user_api.add_user'), json=data).json()
        if r['status'] == 'success':
            r = requests.post('http://127.0.0.1:5000' + url_for('auth_api.login'), json=data).json()
            if r['status'] == 'success':
                jwt_decoded = decode_token(r['access_token'])
                user = User.query.filter_by(username=jwt_decoded['identity']).first()
                flash('account created for {}'.format(user.username))
                login_user(user)
                session[current_user.username] = r['access_token']
                return redirect(url_for('home.index'))
            else:
                flash('login failed')
        else:
            flash('registration api error, maybe url host')
            flash(r)

    return render_template('register.html', current_page_title=current_page_title, registrationform=registrationform)
