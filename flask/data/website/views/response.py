from flask import Blueprint, render_template, redirect, url_for
from data import login_manager

bp = Blueprint('response', __name__, template_folder='./../templates', static_folder='./../static', static_url_path='website/static', url_prefix='/')


@bp.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login.login'))
