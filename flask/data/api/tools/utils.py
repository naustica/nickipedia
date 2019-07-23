from functools import wraps
from flask import request, make_response, jsonify
from data.database.user import User


def permission_needed(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        try:
            username = request.json['session_username']
            user = User.query.filter_by(username=username).first()
            if user.authenticated:
                pass
            else:
                return make_response(jsonify('login first'))
        except Exception:
            return make_response(jsonify('missing session_username parameter to get access.'))
        return function(*args, **kwargs)
    return wrapper
