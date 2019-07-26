from flask import render_template
from . import main


@main.route('/user/<name>', methods=['GET', 'POST'])
def user(name):

    current_page_title = 'user'

    return render_template('user.html', name=name, current_page_title=current_page_title)
