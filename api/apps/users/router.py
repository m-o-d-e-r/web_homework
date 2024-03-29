
from flask import Blueprint

from api.apps.users.views import (
    register_new_user,
    login_user_handler,
    loguot_user_handler
)


users_blueprint = Blueprint("users", __name__, url_prefix="/users")

users_blueprint.add_url_rule(
    "/registration",
    view_func=register_new_user,
    methods=["POST"]
)

users_blueprint.add_url_rule(
    "/login",
    view_func=login_user_handler,
    methods=["POST"]
)

users_blueprint.add_url_rule(
    "/logout",
    view_func=loguot_user_handler,
    methods=["POST"]
)
