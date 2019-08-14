from flask import Blueprint, jsonify, make_response, request
from data.database.video import Video, videos_schema


bp = Blueprint('search_api', __name__, url_prefix='/api')


@bp.route('/search', methods=['GET'])
def get_results():
    """
    example: GET: host/api/search?term=nickipedia&table=video
    """

    term = request.args.get('term', default='', type=str)

    table = request.args.get('table', default='video', type=str)

    if table == 'video':

        results = Video.query.filter(Video.title.ilike('{}{}{}'.format('%', term, '%'))).all()

        if not results:
            return make_response(jsonify(message='no results')), 200

        return make_response(videos_schema.jsonify(results)), 200

    else:
        return make_response(jsonify(message='no results')), 200
