from flask import Blueprint, render_template, request

app_view = Blueprint('app_view', __name__, url_prefix='')


@app_view.route('/')
def index_view():
    return render_template('/base.html')


@app_view.route('/test')
def test_view():
    return render_template('test/base_test.html')


@app_view.route('/test2')
def test2_view():
    return render_template('test/base_test2.html')
