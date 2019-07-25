from flask import Blueprint, jsonify, make_response, request
from data.database.comment import Comment, comment_schema, comments_schema
from data import db
from data.api.auth import permission_needed


bp = Blueprint('comment', __name__, url_prefix='/api')


@bp.route('/comment', methods=['GET'])
def get_comments():
    """
    example: GET: host/api/comment?comment_id=1&video_id=1
    """

    comment_id = request.args.get('comment_id', default=0, type=int)
    video_id = request.args.get('video_id', default=0, type=int)
    all = request.args.get('all', default=False, type=bool)

    if all:
        all_comments = Comment.query.filter_by(video_id=video_id).all()
        if not all_comments:
            return make_response(jsonify(message='specify a correct video_id')), 404
        result = comments_schema.dump(all_comments)

        return make_response(jsonify(result.data)), 200

    if not all:

        comment = Comment.query.filter_by(id=comment_id, video_id=video_id).first()

        if not comment:
            return make_response(jsonify(message='comment not found')), 404

        return make_response(comment_schema.jsonify(comment)), 200


@bp.route('/comment', methods=['POST'])
def create_comment():
    """
    example: POST: host/api/comment
    """

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    comment, errors = comment_schema.load(request.get_json())
    if errors:
        return make_response(jsonify(errors)), 400

    comment.save()

    return make_response(jsonify(status='success')), 200


@bp.route('/comment', methods=['PUT'])
#@permission_needed
def update_comment():
    """
    example: PUT: host/api/comment?comment_id=1
    """

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    comment_id = request.args.get('comment_id', default=0, type=int)

    comment = Comment.query.get(comment_id)

    if not comment:
        return make_response(jsonify(message='no correct comment_id'))

    data = request.get_json()
    data.pop('id', None)
    data.pop('author_id', None)

    errors = comment_schema.validate(data, partial=True)

    if errors:
        return make_response(jsonify(errors)), 400

    comment.update(**data)

    return make_response(jsonify(message='comment updated')), 200


@bp.route('/comment', methods=['DELETE'])
def delete_comment():
    """
    example: DELETE: host/api/comment?comment_id=1
    """

    comment_id = request.args.get('comment_id', default=0, type=int)

    comment = Comment.query.get(comment_id)

    if not comment:
        return make_response(jsonify(message='comment not found')), 404

    comment.delete()

    return make_response(jsonify(message='comment deleted')), 200
