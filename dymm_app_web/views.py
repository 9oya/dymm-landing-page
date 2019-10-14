from flask import Blueprint, render_template, request

app_view = Blueprint('app_view', __name__, url_prefix='')


@app_view.route('/')
def index_view():
    return render_template('home/base_home.html')
