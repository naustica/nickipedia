from flask import Blueprint, jsonify
from data.database.video import Video


bp = Blueprint('search', __name__, url_prefix='/api')


@bp.route('/search/<term>', methods=['GET'])
def get_results(term):
    search = Video.query.filter(Video.title.ilike('{}{}{}'.format('%', term, '%'))).all()

    data = []

    for result in search:
        result = {'id': int(result.id), 'properties': {'title': str(result.title), 'text': str(result.text)}}
        data.append(result)

    return jsonify(data), 200
