from flask import render_template, request, redirect, url_for
from data.website.forms import SearchForm
from . import main


@main.route('/', methods=['GET', 'POST'])
@main.route('/home', methods=['GET', 'POST'])
def index():

    current_page_title = 'home'

    searchform = SearchForm()
    if searchform.validate_on_submit():
        return redirect(url_for('main.result', search=request.form['search']))

    return render_template('index.html', searchform=searchform, current_page_title=current_page_title)
