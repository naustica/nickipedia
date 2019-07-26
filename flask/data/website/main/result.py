from flask import render_template
from data.database.video import Video
from . import main


@main.route('/result/<search>', methods=['GET', 'POST'])
def result(search):

    current_page_title = 'result'

    search = Video.query.filter(Video.title.ilike('{}{}{}'.format('%', search, '%'))).all()

    return render_template('results.html', search=search, current_page_title=current_page_title)
