from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_mail import Mail

from .blueprint import register_blueprint

app = Flask('dymm_app_web')
app.config.from_object('dymm_app_web.config.ProductionConfig')
# app.config.from_object('dymm_app_web.config.DevelopmentConfig')

db = SQLAlchemy(app)
b_crypt = Bcrypt(app)
mail = Mail(app)
register_blueprint(app)
