from flask import Blueprint, render_template, request, redirect, url_for
from data.website.forms import SearchForm


bp = Blueprint('home', __name__, template_folder='./../templates', static_folder='./../static', static_url_path='website/static', url_prefix='/')


@bp.route('/', methods=['GET', 'POST'])
@bp.route('/home', methods=['GET', 'POST'])
def index():

    current_page_title = 'home'

    searchform = SearchForm()
    if searchform.validate_on_submit():
        return redirect(url_for('result.result', search=request.form['search']))

    return render_template('index.html', searchform=searchform, current_page_title=current_page_title)
