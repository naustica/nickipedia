from flask import Blueprint, render_template
from data.database.video import Video


bp = Blueprint('result', __name__, template_folder='./../templates', static_folder='./../static', static_url_path='website/static', url_prefix='/')


@bp.route('/result/<search>', methods=['GET', 'POST'])
def result(search):

    current_page_title = 'result'

    search = Video.query.filter(Video.title.ilike('{}{}{}'.format('%', search, '%'))).all()

    return render_template('results.html', search=search, current_page_title=current_page_title)
