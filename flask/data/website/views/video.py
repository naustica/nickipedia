from flask import render_template, flash, redirect, url_for
from flask_login import current_user
from data import db
from data.database.comment import Comment
from data.database.video import Video
from sqlalchemy import desc
from data.website.views.forms import CommentForm
from data.config import local_files_path
from . import main


@main.route('/watch/<video_id>', methods=['GET', 'POST'])
def video(video_id):

    current_page_title = 'video'

    video = Video.query.filter_by(id=video_id).first()

    if video is None:
        return redirect(404)

    root = video.root

    filename = video.filename

    video_title = video.title

    video_author = video.author_id

    video_description = video.text

    video_root = local_files_path + 'videos/' + video_author + '/' + filename

    comments = Comment.query.filter_by(video_id=video_id).order_by(desc(Comment.id)).all()

    suggestions = Video.query.filter(Video.id != video_id).all()

    commentform = CommentForm()
    if commentform.validate_on_submit():

        comment = Comment(author_id=current_user.username, video_id=video_id, content=commentform.content.data)
        db.session.add(comment)
        db.session.commit()
        flash('posted')
        return redirect(url_for('main.video', video_id=video_id))

    return render_template('watch.html', video_id=video_id, comments=comments,
                            commentform=commentform, root=video_root, video_title=video_title,
                            video_description=video_description, video_author=video_author,
                            current_page_title=current_page_title, suggestions=suggestions)
