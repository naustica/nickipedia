from flask import Blueprint, jsonify, make_response, request
from data.database.likes import Like, like_schema
from data.api.auth import permission_needed
from flask_jwt_extended import decode_token


bp = Blueprint('like_api', __name__, url_prefix='/api')


@bp.route('/likes', methods=['GET'])
def get_vote_from_video():
    """
    example: GET: host/api/likes?v=1
    """

    video_id = request.args.get('v', default=0, type=int)

    likes = Like.query.filter_by(video_id=video_id, like=1).count()

    dislikes = Like.query.filter_by(video_id=video_id, dislike=1).count()

    return make_response(jsonify(video_id=video_id, likes=likes, dislikes=dislikes)), 200


@bp.route('/likes/user', methods=['GET'])
@permission_needed
def get_vote_from_user():
    """
    example: GET: host/api/likes/user?v=1
    """

    video_id = request.args.get('v', default=0, type=int)

    access_token = request.headers.get('Authorization')

    decoded_token = decode_token(access_token)

    author_id = decoded_token['identity']

    like = Like.query.filter_by(author_id=author_id, video_id=video_id).first()

    if not like:
        return make_response(jsonify(message='vote not found')), 404

    return make_response(like_schema.jsonify(like)), 200


@bp.route('/likes', methods=['POST'])
@permission_needed
def create_vote():
    """
    example: POST: host/api/likes
    """

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    access_token = request.headers.get('Authorization')

    decoded_token = decode_token(access_token)

    author_id = decoded_token['identity']

    like, errors = like_schema.load(request.get_json(), partial=True)
    if errors:
        return make_response(jsonify(errors)), 400

    like.author_id = author_id

    like.save()

    return make_response(jsonify(status='success')), 200


@bp.route('/likes', methods=['PUT'])
@permission_needed
def update_vote():
    """
    example: PUT: host/api/likes?v=1
    """

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    video_id = request.args.get('v', default=0, type=int)

    access_token = request.headers.get('Authorization')

    decoded_token = decode_token(access_token)

    author_id = decoded_token['identity']

    like = Like.query.filter_by(author_id=author_id, video_id=video_id).first()

    if not like:
        return make_response(jsonify(message='no vote found')), 404

    data = request.get_json()
    data.pop('id', None)
    data.pop('video_id', None)

    errors = like_schema.validate(data, partial=True)

    if errors:
        return make_response(jsonify(errors)), 400

    like.update(**data)

    return make_response(jsonify(message='vote updated')), 200
