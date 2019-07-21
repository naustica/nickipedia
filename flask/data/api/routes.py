from flask import Blueprint, jsonify, request
from data.database.video import Video
from data.database.user import User


bp = Blueprint('routes', __name__, url_prefix='/api')


@bp.route('/search/<term>', methods=['GET'])
def get_results(term):
    search = Video.query.filter(Video.title.like('{}{}{}'.format('%', term, '%'))).all()

    data = []

    for result in search:
        result = {'id': int(result.id), 'properties': {'title': str(result.title), 'text': str(result.text)}}
        data.append(result)

    return jsonify(data)


@bp.route('/user', methods=['GET'])
def get_users():
    users = User.get_all()

    data = []

    for user in users:
        result = {'id': int(user.id), 'properties': {'username': user.username}}
        data.append(result)

    return jsonify(data)


@bp.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter(User.id == user_id).first()
    data = {'id': int(user.id), 'properties': {'username': user.username}}

    return jsonify(data)
