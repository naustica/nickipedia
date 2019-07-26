from flask import Blueprint, render_template


bp = Blueprint('user', __name__, template_folder='./../templates', static_folder='./../static', static_url_path='website/static', url_prefix='/')


@bp.route('/user/<name>', methods=['GET', 'POST'])
def user(name):

    current_page_title = 'user'

    return render_template('user.html', name=name, current_page_title=current_page_title)
