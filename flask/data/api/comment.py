from flask import Blueprint, jsonify, make_response, request
from data.database.comment import Comment, comment_schema, comments_schema
from data import db


bp = Blueprint('comment', __name__, url_prefix='/api')


@bp.route('/comment/<video_id>/<comment_id>', methods=['GET'])
def get_comment(video_id, comment_id):

    comment = Comment.query.filter_by(id=comment_id, video_id=video_id).first()

    if not comment:
        return make_response(jsonify(message='comment not found')), 404

    return comment_schema.jsonify(comment), 200


@bp.route('/comment/<video_id>', methods=['POST'])
def create_comment(video_id):

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    comment, errors = comment_schema.load(request.get_json())
    if errors:
        return make_response(jsonify(errors)), 400

    comment.save()

    return make_response(jsonify(status='success')), 200


@bp.route('/comment/<video_id>', methods=['GET'])
def get_all_comments(video_id):
    all_comments = Comment.query.filter_by(video_id=video_id).all()
    result = comments_schema.dump(all_comments)

    return jsonify(result.data), 200


@bp.route('/comment/<comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)

    content = request.json['content']

    comment.content = content

    db.session.commit()

    return make_response(jsonify(message='comment updated')), 200


@bp.route('/comment/<comment_id>', methods=['DELETE'])
def delete_comment(comment_id):

    comment = Comment.query.get(comment_id)

    if not comment:
        return make_response(jsonify(message='comment not found')), 404

    comment.delete()

    return make_response(jsonify(message='comment deleted')), 200
