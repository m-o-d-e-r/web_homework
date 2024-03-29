from flask import Flask, jsonify
from flask_migrate import Migrate

from api.utils.database import db
from api.utils.exceptions import ProjectBaseException
from api.utils.config_reader import get_config

from api.apps.catalog.router import catalog_blueprint
from api.apps.admin.router import admin_blueprint
from api.apps.users.router import users_blueprint

from api.models.roles import Roles
from api.models.product import Products
from api.models.users import Users


def handle_exception(e: Exception):  
    return jsonify(
        detail=str(e)
    )


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://{}:{}@{}:{}/{}".format(
        get_config().API_DB_USER,
        get_config().API_DB_PASSWORD,
        get_config().API_DB_HOST,
        get_config().API_DB_PORT,
        get_config().API_DB_NAME
    )
    app.config["SECRET_KEY"] = "secret key"

    app.register_error_handler(Exception, handle_exception)

    app.register_blueprint(catalog_blueprint)
    app.register_blueprint(admin_blueprint)
    app.register_blueprint(users_blueprint)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    Migrate(app, db)

    return app
