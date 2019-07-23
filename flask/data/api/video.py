from flask import Blueprint, jsonify
from data.database.video import Video


bp = Blueprint('video', __name__, url_prefix='/api')


@bp.route('/video', methods=['POST'])
def create_video():

    return True, 200
