from flask import Blueprint, jsonify, request, make_response
from data.database.video import Video, video_schema, videos_schema
from data.api.auth import permission_needed
from data import db
from werkzeug import secure_filename
import os
from data.config import upload_path
from fnmatch import fnmatch
from datetime import datetime


bp = Blueprint('video', __name__, url_prefix='/api')


@bp.route('/video', methods=['POST'])
#@permission_needed
def create_video():

    title = request.form['title']
    text = request.form['text']
    author_id = request.form['author_id']
    file = request.files.get('file')

    if not title:
        return make_response(jsonify(message='no title found')), 400

    if not text:
        return make_response(jsonify(message='no text found')), 400

    if not author_id:
        return make_response(jsonify(message='no author_id found')), 400

    if not file:
        return make_response(jsonify(message='no file found')), 400

    filename = secure_filename(file.filename)

    if not fnmatch(filename, '*.mp4'):
        return make_response(jsonify(message='the video format should be mp4')), 400

    path = '{}{}/{}'.format(upload_path, 'videos', author_id)

    if not os.path.exists(path):
        os.makedirs(path)

    new_filename = secure_filename(str(datetime.now()) + '.mp4')
    file.save('{}{}{}'.format(path, '/', new_filename))

    new_video = Video(author_id, title, text, path, new_filename)
    new_video.save()
    return make_response(jsonify(message='video created')), 201


@bp.route('/video', methods=['GET'])
def get_videos():

    video_id = request.args.get('video_id', default=0, type=int)
    all = request.args.get('all', default=False, type=bool)

    if all:

        all_videos = Video.get_all()

        result = videos_schema.dump(all_videos)

        return make_response(jsonify(result.data)), 200

    if not all:

        video = Video.query.get(video_id)
        if not video:
            return make_response(jsonify(message='video not found')), 404

        return make_response(video_schema.jsonify(video)), 200


@bp.route('/video', methods=['PUT'])
#@permission_needed
def update_video():

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    video_id = request.args.get('video_id', default=0, type=int)

    video = Video.query.get(video_id)
    if not video:
        return make_response(jsonify(message='video not found')), 404

    title = request.json['title']
    text = request.json['text']

    if not title:
        return make_response(jsonify(message='no title in parameter')), 400

    if not text:
        return make_response(jsonify(message='no text in parameter')), 400

    video.title = title
    video.text = text

    db.session.commit()

    return make_response(jsonify(message='video updated')), 201


@bp.route('/video', methods=['DELETE'])
#@permission_needed
def delete_video():

    video_id = request.args.get('video_id', default=0, type=int)

    video = Video.query.get(video_id)
    if not video:
        return make_response(jsonify(message='video not found')), 404

    video.delete()

    return make_response(jsonify(message='video deleted')), 200
