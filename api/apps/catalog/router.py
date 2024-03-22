
from flask import Blueprint

from api.apps.catalog.views import (
    get_product_list,
    get_detail_info
)


catalog_blueprint = Blueprint("catalog", __name__, url_prefix="/catalog")

catalog_blueprint.add_url_rule(
    "/product_list",
    view_func=get_product_list,
    methods=["POST"]
)

catalog_blueprint.add_url_rule(
    "/detail/<int:product_id>",
    view_func=get_detail_info,
    methods=["GET"]
)
