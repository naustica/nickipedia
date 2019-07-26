from flask import Blueprint, jsonify, make_response, request
from data.database.video import Video


bp = Blueprint('search_api', __name__, url_prefix='/api')


@bp.route('/search', methods=['GET'])
def get_results():
    """
    example: GET: host/api/search?term=nickipedia
    """

    term = request.args.get('term', default='', type=str)

    search = Video.query.filter(Video.title.ilike('{}{}{}'.format('%', term, '%'))).all()

    data = []

    for result in search:
        result = {'id': int(result.id), 'properties': {'title': str(result.title), 'text': str(result.text)}}
        data.append(result)

    return make_response(jsonify(data)), 200
