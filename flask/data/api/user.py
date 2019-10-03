from flask import Blueprint, jsonify, request, make_response, render_template
from data.database.user import User, user_schema, users_schema
from data.api.auth import permission_needed
from werkzeug import secure_filename
import os
from data.config import upload_path
from fnmatch import fnmatch
from datetime import datetime, timedelta
from flask_mail import Message
from data import mail
from flask_jwt_extended import create_access_token


bp = Blueprint('user_api', __name__, url_prefix='/api', template_folder='./templates')


@bp.route('/user', methods=['GET'])
def get_user():
    """
    example: GET: host/api/user?username=nickipedia
    """

    username = request.args.get('username', default='', type=str)
    all = request.args.get('all', default=False, type=bool)

    if all:
        all_user = User.get_all()
        result = users_schema.dump(all_user)

        return jsonify(result.data), 200

    if not all:

        user = User.query.get(username)
        if not user:
            return jsonify(message='user not found'), 404

        return user_schema.jsonify(user), 200


@bp.route('/user/register', methods=['POST'])
def register_user():
    """
    example: POST: host/api/user
    """

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    user, errors = user_schema.load(request.get_json())
    if errors:
        return make_response(jsonify(errors)), 400

    expires = timedelta(days=1)
    confirmation_token = create_access_token(identity=user.username, expires_delta=expires)
    msg = Message('confirm your account', recipients=[user.email])
    msg.html = render_template('confirm.html', username=user.username, confirmation_token=confirmation_token)
    mail.send(msg)

    user.save()

    return make_response(jsonify(status='success')), 200


@bp.route('/user', methods=['PUT'])
def user_update():
    """
    example: PUT: host/api/user?username=nickipedia
    """

    username = request.args.get('username', default='', type=str)

    user = User.query.get(username)

    if not user:
        return make_response(jsonify(message='user not found')), 400

    data = request.get_json()
    data.pop('username', None)

    errors = user_schema.validate(data, partial=True)

    if errors:
        return make_response(jsonify(errors)), 400

    user.update(**data)

    return make_response(jsonify(message='user updated')), 200


@bp.route('/user/photo', methods=['PUT'])
def user_pic_update():
    """
    example: PUT: host/api/user/photo?username=nickipedia
    """

    username = request.args.get('username', default='', type=str)

    user = User.query.get(username)

    if not user:
        return make_response(jsonify(message='user not found')), 400

    pic = request.files.get('file')

    if not pic:
        return make_response(jsonify(message='no file found.')), 400

    filename = secure_filename(pic.filename)

    if not fnmatch(filename, '*.jpg'):
        return make_response(jsonify(message='the file format should be jpg.')), 400

    path = '{}{}/{}'.format(upload_path, 'photos', user.username)

    if not os.path.exists(path):
        os.makedirs(path)

    new_filename = secure_filename(str(datetime.now()) + '.jpg')
    path = '{}{}{}'.format(path, '/', new_filename)
    pic.save(path)

    user.profile_picure = path
    user.save()
    return make_response(jsonify(message='profile picure updated.')), 201


@bp.route('/user', methods=['DELETE'])
def user_delete():
    """
    example: DELETE: host/api/user?username=nickipedia
    """

    username = request.args.get('username', default='', type=str)

    user = User.query.get(username)

    if not user:
        return make_response(jsonify(message='user not found')), 400

    user.delete()

    return make_response(jsonify(message='user deleted')), 200
