from flask import Blueprint, jsonify, make_response, request
from data.database.video import Video, videos_schema
from data import db
from sqlalchemy import func


bp = Blueprint('search_api', __name__, url_prefix='/api')


@bp.route('/search', methods=['GET'])
def get_results():
    """
    example: GET: host/api/search?term=nickipedia&table=video?page=1
    """

    term = request.args.get('term', default='', type=str)

    table = request.args.get('table', default='video', type=str)

    page = request.args.get('page', default='1', type=int)

    start = 0

    stop = 10

    if table == 'video':

        all_rows = db.session.query(func.count(Video.id)).scalar()

        page = int(page)

        page_limit = all_rows / stop

        if page <= page_limit:

            start = (page - 1) * stop

            results = Video.query.filter(Video.title.ilike('{}{}{}'.format('%', term, '%'))).offset(start).limit(stop).all()

            if not results:
                return make_response(jsonify([])), 200

            return make_response(videos_schema.jsonify(results)), 200

        else:
            return make_response(jsonify([])), 200

    else:
        return make_response(jsonify([])), 200
