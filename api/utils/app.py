from flask import Flask, json, Response
from flask_migrate import Migrate

from api.utils.database import db
from api.utils.exceptions import ProjectBaseException, ForbiddenException, ValueException
from api.utils.config_reader import get_config

from api.apps.catalog.router import catalog_blueprint
from api.apps.admin.router import admin_blueprint

from api.models.roles import Roles
from api.models.product import Products
from api.models.users import Users


def handle_exception(e: ProjectBaseException):
    response: Response = e.get_response()
    response.data = json.dumps({
        "status_code": e.code,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://{}:{}@{}:{}/{}".format(
        get_config().API_DB_USER,
        get_config().API_DB_PASSWORD,
        get_config().API_DB_HOST,
        get_config().API_DB_PORT,
        get_config().API_DB_NAME
    )

    app.register_error_handler(ForbiddenException, handle_exception)
    app.register_error_handler(ValueException, handle_exception)

    app.register_blueprint(catalog_blueprint)
    app.register_blueprint(admin_blueprint)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    Migrate(app, db)

    return app
