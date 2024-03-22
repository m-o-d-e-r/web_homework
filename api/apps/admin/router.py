
from flask import Blueprint

from api.apps.admin.views import add_new_product


admin_blueprint = Blueprint("admin", __name__, url_prefix="/admin")

admin_blueprint.add_url_rule(
    "/add_product",
    view_func=add_new_product,
    methods=["POST"]
)
