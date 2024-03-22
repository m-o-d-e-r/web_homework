from flask import Flask, json, Response
from flask_migrate import Migrate

from api.utils.database import db
from api.utils.exceptions import ProjectBaseException, ForbiddenException, ValueException

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
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:postgres@localhost:5432/shop"

    app.register_error_handler(ForbiddenException, handle_exception)
    app.register_error_handler(ValueException, handle_exception)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    Migrate(app, db)

    return app
