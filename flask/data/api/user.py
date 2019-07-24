from flask import Blueprint, jsonify, request, make_response
from data.database.user import User, user_schema, users_schema
from data import db
from data.api.auth import permission_needed


bp = Blueprint('user', __name__, url_prefix='/api')


@bp.route('/user', methods=['GET'])
def get_all_user():
    all_user = User.get_all()
    result = users_schema.dump(all_user)

    return jsonify(result.data), 200


@bp.route('/user/<username>', methods=['GET'])
@permission_needed
def get_user(username):
    user = User.query.get(username)
    if user is None:
        return jsonify(message='user not found'), 404

    return user_schema.jsonify(user), 200


@bp.route('/user/register', methods=['POST'])
def add_user():
    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    user, errors = user_schema.load(request.get_json())
    if errors:
        return make_response(jsonify(errors)), 400

    user.save()

    return make_response(jsonify(status='success')), 200


@bp.route('/user/<username>', methods=['PUT'])
def user_update(username):

    user = User.query.get(username)

    username = request.json['username']

    user.username = username

    db.session.commit()

    return make_response(jsonify(message='user updated')), 200


@bp.route('/user/<username>', methods=['DELETE'])
def user_delete(username):
    user = User.query.get(username)
    user.delete()

    return make_response(jsonify(message='user deleted')), 200
