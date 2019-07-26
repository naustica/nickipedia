from flask import Blueprint, redirect, url_for, make_response, jsonify
from data import db

bp = Blueprint('helpers', __name__, template_folder='./../templates', static_folder='./../static', static_url_path='website/static', url_prefix='/')


@bp.route('/test', methods=['GET', 'POST'])
def test():

    return make_response(jsonify(test=42))


@bp.route('/reset')
def reset():
    db.drop_all()
    db.create_all()

    from data import db_start

    return redirect(url_for('register.register'))
