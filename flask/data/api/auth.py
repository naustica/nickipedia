from flask import Blueprint, jsonify, request, make_response
from data.database.user import User
from data.database.token import Token
from flask_jwt_extended import create_access_token, decode_token
from data import bcrypt, db
from functools import wraps
from datetime import timedelta


bp = Blueprint('auth_api', __name__, url_prefix='/api/auth')


def permission_needed(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        try:
            access_token = request.headers.get('Authorization')

            if not access_token:
                return make_response(jsonify(message='missing access_token')), 401

            decoded_token = decode_token(access_token)

            username = decoded_token['identity']

            user = User.query.get(username)

            token = Token.query.filter_by(token=access_token, username=user.username)

            if not user:
                return make_response(jsonify(message='user not found')), 400

            if not token:
                return make_response(jsonify(message='invalid token')), 401

        except Exception:
            return make_response(jsonify(message='permission needed.')), 401
        return function(*args, **kwargs)
    return wrapper


@bp.route('/login', methods=['POST'])
def login():
    """
    example: POST: host/api/auth/login
    """

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    username = request.json.get('username')
    password = request.json.get('password')

    if not username:
        return make_response(jsonify(message='missing username parameter')), 400

    if not password:
        return make_response(jsonify(message='missing password parameter')), 400

    user = User.query.get(username)

    try:
        if bcrypt.check_password_hash(user.password, password):
            if not user.authenticated:
                return make_response(jsonify(status='fail', message='accout not confirmed yet.')), 400
            db.session.commit()
            expires = timedelta(days=1)
            access_token = create_access_token(identity=username, expires_delta=expires)
            Token(access_token, user.username).save()
            return make_response(jsonify(status='success', access_token=access_token)), 200
        else:
            return make_response(jsonify(status='fail', message='wrong keywords, maybe password not encoded.')), 400
    except Exception as e:
        print(e)
        return make_response(jsonify(status='fail', message='try again')), 500


@bp.route('/logout', methods=['POST'])
@permission_needed
def logout():
    """
    example: POST: host/api/auth/logout
    """

    access_token = request.headers.get('Authorization')

    decoded_token = decode_token(access_token)

    username = decoded_token['identity']

    user = User.query.get(username)

    if not user:
        return make_response(jsonify(message='user not found')), 400

    token = Token.query.get(access_token)

    if token.username != user.username:
        return make_response(jsonify(message='wrong token username combination'))

    token.delete()

    db.session.commit()

    return make_response(jsonify(message='successfully logged out.')), 200


@bp.route('/confirm/<confirmation_token>', methods=['GET'])
def confirm(confirmation_token):
    """
    example: GET: host/api/auth/confirm/XXXXXXXXXXXXXXXXXXXXXXX
    """
    try:
        decoded_token = decode_token(confirmation_token)

        username = decoded_token['identity']

        user = User.query.get(username)

        if not user:
            return make_response(jsonify(message='user not found')), 400

        if user.authenticated:
            return make_response(jsonify(message='already authenticated.')), 200

        if not user.authenticated:
            user.authenticated = True
            db.session.commit()
            return make_response(jsonify(message='you have confirmed your account.')), 200

    except Exception:
        return make_response(jsonify(message='the confirmation link is invalid or has expired.')), 400
