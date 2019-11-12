from flask import render_template
from flask_mail import Message

from dymm_app_web import mail
from .patterns import URIPattern

_u = URIPattern()


def send_mail(name, email, content):
    message = Message()
    message.add_recipient('eido9oya@dymm.io')
    message.html = render_template('contact_mail.html',
                                   name=name, email=email, message=content)
    message.subject = "Contact from {0}".format(name)
    mail.send(message)
