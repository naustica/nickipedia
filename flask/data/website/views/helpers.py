from flask import redirect, url_for, render_template
from data import db
from . import main


@main.route('/test', methods=['GET', 'POST'])
def test():

    current_page_title = 'test'

    return render_template('test.html', current_page_title=current_page_title)


@main.route('/reset')
def reset():
    db.drop_all()
    db.create_all()

    from data import db_start

    return redirect(url_for('main.register'))
