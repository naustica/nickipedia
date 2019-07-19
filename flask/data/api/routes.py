from flask import Blueprint, jsonify
from data.models import Video


bp = Blueprint('routes', __name__, url_prefix='/api')


@bp.route('/search/<term>', methods=['GET'])
def get(term):
    search = Video.query.filter(Video.title.like('{}{}{}'.format('%', term, '%'))).all()

    data = []

    for result in search:
        result = {'id': int(result.id), 'properties': {'title': str(result.title), 'text': str(result.text)}}
        data.append(result)

    return jsonify(data)
