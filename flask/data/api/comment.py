from flask import Blueprint, jsonify
from data.database.comment import Comment


bp = Blueprint('comment', __name__, url_prefix='/api')


@bp.route('/comment', methods=['POST'])
def create_comment():
    return True, 200
