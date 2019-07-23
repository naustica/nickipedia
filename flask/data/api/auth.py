from flask import Blueprint, jsonify, request, make_response
from data.database.user import User
from flask_jwt_extended import create_access_token, decode_token
from data import bcrypt


bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/register', methods=['POST'])
def register_user():

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not username:
        return make_response(jsonify(message='missing username parameter')), 400

    if not email:
        return make_response(jsonify(message='missing email parameter')), 400

    if not password:
        return make_response(jsonify(message='missing password parameter')), 400

    user = User.query.filter_by(username=username).first()

    if not user:
        try:
            new_user = User(username, email, password)
            new_user.save()
            new_user.authenticated = True
            access_token = create_access_token(identity=username)
            return make_response(jsonify(status='success', access_token=access_token)), 200

        except Exception:
            return make_response(jsonify(status='fail', message='error. please try again.')), 400
    else:
        return make_response(jsonify(status='fail', message='user already exists.')), 400


@bp.route('/login', methods=['POST'])
def login():

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    if not username:
        return make_response(jsonify(message='missing username parameter')), 400

    if not email:
        return make_response(jsonify(message='missing email parameter')), 400

    if not password:
        return make_response(jsonify(message='missing password parameter')), 400

    user = User.query.filter_by(username=username, email=email).first()

    jwt_decoded = decode_token(password)

    try:
        if bcrypt.check_password_hash(user.password, jwt_decoded['identity']):
            user.authenticated = True
            access_token = create_access_token(identity=username)
            return make_response(jsonify(status='success', access_token=access_token)), 200
        else:
            return make_response(jsonify(status='fail', message='wrong keywords'))
    except Exception as e:
        print(e)
        return make_response(jsonify(status='fail', message='try again')), 500
