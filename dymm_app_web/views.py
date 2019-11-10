from flask import Blueprint, render_template, request

from dymm_app_web.language import EngPack, KorPack

app_view = Blueprint('app_view', __name__, url_prefix='')


@app_view.route('/')
def index_view():
    lang_code = request.cookies.get('dymm_client_lang')
    if lang_code is None:
        try:
            lang_info = request.headers.environ['HTTP_ACCEPT_LANGUAGE']
            lang_arr = lang_info.split(',')
            lang_code = lang_arr[0]
        except:
            lang_code = 'en-US'
    if lang_code == 'ko-KR':
        lang_pack = KorPack()
        lang_txt = '언어'
    else:
        lang_pack = EngPack()
        lang_txt = 'Language'
    return render_template('index.html', txt=lang_pack, lang_txt=lang_txt,
                           lang_code=lang_code)


@app_view.route('/test')
def test_view():
    return render_template('test/test.html')
