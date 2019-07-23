from flask import Blueprint, jsonify, request
from data.database.user import User, user_schema, users_schema
from data import db


bp = Blueprint('user', __name__, url_prefix='/api')


@bp.route('/user', methods=['GET'])
def get_all_user():
    all_user = User.get_all()
    result = users_schema.dump(all_user)

    return jsonify(result.data)


@bp.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify(message='User not found'), 404

    return user_schema.jsonify(user), 200


@bp.route('/user', methods=['POST'])
def add_user():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    new_user = User(username, email, password)
    new_user.save()

    return user_schema.jsonify(new_user)


@bp.route('/user/<id>', methods=['PUT'])
def user_update(id):
    user = User.query.get(id)
    username = request.json['username']

    user.username = username

    db.session.commit()

    return user_schema.jsonify(user)


@bp.route('/user/<id>', methods=['DELETE'])
def user_delete(id):
    user = User.query.get(id)
    user.delete()

    return user_schema.jsonify(user)
