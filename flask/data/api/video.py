from flask import Blueprint, jsonify, request, make_response
from data.database.video import Video, video_schema, videos_schema
from data.api.auth import permission_needed
from werkzeug import secure_filename
import os
from data.config import upload_path
from fnmatch import fnmatch
from datetime import datetime
import pafy
from flask_jwt_extended import decode_token


bp = Blueprint('video', __name__, url_prefix='/api')


@bp.route('/video', methods=['POST'])
#@permission_needed
def create_video():
    """
    example: POST: host/api/video
    """

    title = request.form.get('title')
    text = request.form.get('text')
    author_id = request.form.get('author_id')
    file = request.files.get('file')

    if not title:
        return make_response(jsonify(message='no title found.')), 400

    if not text:
        return make_response(jsonify(message='no text found.')), 400

    if not author_id:
        return make_response(jsonify(message='no author_id found.')), 400

    if not file:
        return make_response(jsonify(message='no file found.')), 400

    filename = secure_filename(file.filename)

    if not fnmatch(filename, '*.mp4'):
        return make_response(jsonify(message='the video format should be mp4.')), 400

    path = '{}{}/{}'.format(upload_path, 'videos', author_id)

    if not os.path.exists(path):
        os.makedirs(path)

    new_filename = secure_filename(str(datetime.now()) + '.mp4')
    file.save('{}{}{}'.format(path, '/', new_filename))

    new_video = Video(author_id, title, text, path, new_filename)
    new_video.save()
    return make_response(jsonify(message='video created.')), 201


@bp.route('/video/add_from_url', methods=['GET'])
#@permission_needed
def add_video_from_url():
    """
    example: GET: host/api/video?url=nickipedia
    """

    url = request.args.get('url', default='', type=str)

    """
    access_token = request.headers.get('Authorization')

    decoded_token = decode_token(access_token)

    author_id = decoded_token['identity']
    """

    author_id = 'admin'  # for test purpose

    path = '{}{}/{}'.format(upload_path, 'videos', author_id)

    new_filename = secure_filename(str(datetime.now()) + '.mp4')

    try:
        video = pafy.new(url)

        title = video.title
        text = video.description
        best = video.getbest(preftype='mp4')

        if not os.path.exists(path):
            os.makedirs(path)

        best.download(filepath='{}{}{}'.format(path, '/', new_filename), quiet=True)

        new_video = Video(author_id, title, text, path, new_filename)
        new_video.save()
        return make_response(jsonify(message='video added.')), 201

    except ValueError:
        return make_response(jsonify(message='video url not correct.')), 400


@bp.route('/video', methods=['GET'])
def get_videos():
    """
    example: GET: host/api/video/?video_id=1
    """

    video_id = request.args.get('video_id', default=0, type=int)
    all = request.args.get('all', default=False, type=bool)

    if all:

        all_videos = Video.get_all()

        result = videos_schema.dump(all_videos)

        return make_response(jsonify(result.data)), 200

    if not all:

        video = Video.query.get(video_id)
        if not video:
            return make_response(jsonify(message='video not found.')), 404

        return make_response(video_schema.jsonify(video)), 200


@bp.route('/video', methods=['PUT'])
#@permission_needed
def update_video():
    """
    example: PUT: host/api/video/?video_id=1
    """

    if not request.is_json:
        return make_response(jsonify(message='missing json.')), 400

    video_id = request.args.get('video_id', default=0, type=int)

    video = Video.query.get(video_id)
    if not video:
        return make_response(jsonify(message='video not found.')), 404

    data = request.get_json()
    data.pop('id', None)
    data.pop('author_id', None)

    errors = video_schema.validate(data, partial=True)

    if errors:
        return make_response(jsonify(errors)), 400

    video.update(**data)

    return make_response(jsonify(message='video updated.')), 201


@bp.route('/video', methods=['DELETE'])
#@permission_needed
def delete_video():
    """
    example: DELETE: host/api/video/?video_id=1
    """

    video_id = request.args.get('video_id', default=0, type=int)

    video = Video.query.get(video_id)
    if not video:
        return make_response(jsonify(message='video not found.')), 404

    video.delete()

    return make_response(jsonify(message='video deleted.')), 200
