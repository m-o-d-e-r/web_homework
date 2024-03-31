
from flask import Blueprint

from api.apps.basket.views import (
    get_basket_by_user_id,
    push_to_basket,
    remove_from_basket
)


basket_blueprint = Blueprint("basket", __name__, url_prefix="/basket")

basket_blueprint.add_url_rule(
    "/",
    view_func=get_basket_by_user_id,
    methods=["GET"]
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
