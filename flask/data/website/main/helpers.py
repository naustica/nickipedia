from flask import redirect, url_for, make_response, jsonify
from data import db
from . import main


@main.route('/test', methods=['GET', 'POST'])
def test():

    return make_response(jsonify(test=42))


@main.route('/reset')
def reset():
    db.drop_all()
    db.create_all()

    from data import db_start

    return redirect(url_for('main.register'))
