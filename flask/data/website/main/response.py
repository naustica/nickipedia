from flask import render_template, redirect, url_for
from data import login_manager
from . import main


@main.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('main.login'))
