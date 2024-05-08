from flask import Blueprint

from api.apps.admin.views import (
    add_new_product,
    update_product_info,
    remove_product
)


admin_blueprint = Blueprint("admin", __name__, url_prefix="/admin")

admin_blueprint.add_url_rule(
    "/products/",
    view_func=add_new_product,
    methods=["POST"]
)

admin_blueprint.add_url_rule(
    "/products/<int:product_id>/",
    view_func=update_product_info,
    methods=["PATCH"]
)

admin_blueprint.add_url_rule(
    "/products/<int:product_id>/",
    view_func=remove_product,
    methods=["DELETE"]
)
