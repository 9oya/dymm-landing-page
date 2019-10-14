def register_blueprint(app):
    from .views import app_view

    app.register_blueprint(app_view)
