from flask import Blueprint, jsonify, request, make_response
from data.database.user import User, user_schema, users_schema
from data import db
from data.api.tools.utils import permission_needed


bp = Blueprint('user', __name__, url_prefix='/api')


@bp.route('/user', methods=['GET'])
def get_all_user():
    all_user = User.get_all()
    result = users_schema.dump(all_user)

    return jsonify(result.data), 200


@bp.route('/user/<id>', methods=['GET'])
@permission_needed
def get_user(id):
    try:
        id = int(id)
    except Exception:
        return jsonify(message='id must be an integer'), 400
    user = User.query.get(id)
    if user is None:
        return jsonify(message='user not found'), 404

    return user_schema.jsonify(user), 200


@bp.route('/user', methods=['POST'])
def add_user():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    new_user = User(username, email, password)
    new_user.save()

    return make_response(jsonify(message='user created')), 201


@bp.route('/user/<id>', methods=['PUT'])
@permission_needed
def user_update(id):
    try:
        id = int(id)
    except Exception:
        return jsonify(message='id must be an integer'), 400
    user = User.query.get(id)
    username = request.json['username']

    user.username = username

    db.session.commit()

    return make_response(jsonify(message='user updated')), 200


@bp.route('/user/<id>', methods=['DELETE'])
@permission_needed
def user_delete(id):
    try:
        id = int(id)
    except Exception:
        return jsonify(message='id must be an integer'), 400
    user = User.query.get(id)
    user.delete()

    return make_response(jsonify(message='user deleted')), 200
