from flask import render_template, flash, redirect, url_for, session
from flask_login import login_user, current_user
from data.database.user import User
from data.website.views.forms import RegistrationForm
import requests
from data.config import local_server_adress
from flask_jwt_extended import decode_token
from . import main


@main.route('/register', methods=['GET', 'POST'])
def register():

    current_page_title = 'registration'

    registrationform = RegistrationForm()
    if registrationform.validate_on_submit():
        data = {'username': registrationform.username.data, 'email': 'lul@kek.de', 'password': 'test'}
        r = requests.post(local_server_adress + url_for('user_api.add_user'), json=data).json()
        if r['status'] == 'success':
            r = requests.post(local_server_adress + url_for('auth_api.login'), json=data).json()
            if r['status'] == 'success':
                jwt_decoded = decode_token(r['access_token'])
                user = User.query.filter_by(username=jwt_decoded['identity']).first()
                flash('account created for {}'.format(user.username))
                login_user(user)
                session[current_user.username] = r['access_token']
                return redirect(url_for('main.index'))
            else:
                flash('login failed')
        else:
            flash('registration api error, maybe url host')
            flash(r)

    return render_template('register.html', current_page_title=current_page_title, registrationform=registrationform)
