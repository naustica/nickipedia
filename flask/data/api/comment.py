from flask import Blueprint, jsonify
from data.database.comment import Comment


bp = Blueprint('comment', __name__, url_prefix='/api')


@bp.route('/comment/<video_id>', methods=['POST'])
def create_comment(id):
    return True, 200


@bp.route('/comment/<id>', methods=['GET'])
def get_all_comments(id):
    return True, 200


@bp.route('/comment/<id>/<comment_id>', methods=['PUT'])
def update_comment(id, comment_id):
    return True, 200


@bp.route('/comment/<id>/<comment_id>', methods=['DELETE'])
def delete_comment(id, comment_id):
    return True, 200


@bp.route('/comment/<id>/<comment_id>', methods=['GET'])
def get_comment(id, comment_id):
    return True, 200
