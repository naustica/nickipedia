from flask import Blueprint, jsonify, request, make_response
from data.database.video import Video, video_schema, videos_schema
from data.api.auth import permission_needed
from data import db
from werkzeug import secure_filename
import os
from data.config import upload_path


bp = Blueprint('video', __name__, url_prefix='/api')


@bp.route('/video', methods=['POST'])
#@permission_needed
def create_video():

    title = request.form['title']
    text = request.form['text']
    author_id = request.form['author_id']

    path = '{}{}'.format(upload_path, author_id)

    if not os.path.exists(path):
        os.makedirs(path)

    file = request.files.get('file')
    filename = secure_filename(file.filename)
    root = os.getcwd() + '/data/database/upload_files/' + author_id
    file.save('{}{}{}'.format(root, '/', filename))

    new_video = Video(author_id, title, text, root, filename)
    new_video.save()
    return make_response(jsonify(message='video created')), 201


@bp.route('/video', methods=['GET'])
def get_all_videos():

    all_videos = Video.get_all()

    result = videos_schema.dump(all_videos)

    return jsonify(result.data), 200


@bp.route('/video/<id>', methods=['GET'])
def get_video(id):

    video = Video.query.get(id)
    if video is None:
        return jsonify(message='video not found'), 404

    return video_schema.jsonify(video), 200


@bp.route('/video/<id>', methods=['PUT'])
@permission_needed
def update_video(id):

    if not request.is_json:
        return make_response(jsonify(message='missing json')), 400

    video = Video.query.get(id)
    if video is None:
        return jsonify(message='video not found'), 404

    title = request.json['title']
    text = request.json['text']

    video.title = title
    video.text = text

    db.session.commit()

    return make_response(jsonify(message='video updated')), 201


@bp.route('/video/<id>', methods=['DELETE'])
@permission_needed
def delete_video(id):

    video = Video.query.get(id)
    if video is None:
        return jsonify(message='video not found'), 404

    video.delete()

    return make_response(jsonify(message='video deleted')), 200
