
from flask import Blueprint

from api.apps.basket.views import (
    get_basket_by_user_id,
    check_product_exists,
    push_to_basket,
    remove_from_basket,
    update_product_count,
    order_products
)


basket_blueprint = Blueprint("basket", __name__, url_prefix="/basket")

basket_blueprint.add_url_rule(
    "/",
    view_func=get_basket_by_user_id,
    methods=["GET"]
)

basket_blueprint.add_url_rule(
    "/contains",
    view_func=check_product_exists,
    methods=["POST"]
)

basket_blueprint.add_url_rule(
    "/push_product",
    view_func=push_to_basket,
    methods=["POST"]
)

basket_blueprint.add_url_rule(
    "/remove",
    view_func=remove_from_basket,
    methods=["POST"]
)

basket_blueprint.add_url_rule(
    "/update_count",
    view_func=update_product_count,
    methods=["POST"]
)

basket_blueprint.add_url_rule(
    "/buy_products",
    view_func=order_products,
    methods=["GET"]
)
