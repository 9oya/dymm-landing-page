from setuptools import setup

setup(
    name='dymm_app_web',
    packages=['dymm_app_web'],
    include_package_data=True,
    install_requires=[
        'flask',
        'blinker',
        'requests',
        'Flask-WTF',
        'Flask-SQLAlchemy',
        'psycopg2-binary',
        'pytz',
        'jsonschema',
        'Flask-Bcrypt',
        'Flask-JWT-Extended',
        'Flask-Mail'
    ]
)
