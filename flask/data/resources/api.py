from data import api
from data.models import Video
from flask_restful import Resource
from flask import jsonify


class Search(Resource):
    def get(self, term):
        search = Video.query.filter(Video.title.like('{}{}{}'.format('%', term, '%'))).all()

        data = []

        for result in search:
            result = {'id': int(result.id), 'properties': {'title': str(result.title), 'text': str(result.text)}}
            data.append(result)

        return jsonify(data)


api.add_resource(Search, '/api/search/<string:term>')
