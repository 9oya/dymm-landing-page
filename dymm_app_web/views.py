from flask import Blueprint, render_template, request

from dymm_app_web.errors import bad_req, forbidden, ok, unauthorized
from dymm_app_web.language import EngPack, KorPack
from dymm_app_web.forms import ContactENGForm, ContactKORForm
from dymm_app_web.mail import send_mail

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
        lang_txt = '한글'
        form = ContactKORForm()
    else:
        lang_pack = EngPack()
        lang_txt = 'ENG'
        form = ContactENGForm()
    form.name.render_kw = {'class': 'contact-input'}
    form.email.render_kw = {'class': 'contact-input'}
    form.message.render_kw = {'class': 'contact-input'}
    return render_template('index.html', txt=lang_pack, lang_txt=lang_txt,
                           lang_code=lang_code, form=form)


@app_view.route('/test')
def test_view():
    return render_template('test/test.html')


@app_view.route('/contact', methods=['POST'])
def send_contact_mail():
    form = ContactENGForm(request.form)
    if not form.validate():
        return bad_req(form.errors)
    send_mail(form.name.data, form.email.data, form.message.data)
    return ok()
