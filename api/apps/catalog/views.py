from flask import jsonify, request

from api.models.product import Products
from api.utils.exceptions import ForbiddenException
from api.utils.query_utils import get_product_or_none
from api.schemas.catalog_schemas import CatalogFilters


def get_product_list():
    result: list[Products] = Products.query.filter_by(
        **CatalogFilters(**request.get_json()).model_dump()
    ).all()

    return jsonify(
        product_list=[i.to_dict() for i in result]
    )


def get_detail_info(product_id: int):
    result = get_product_or_none(product_id)

    if not result:
        raise ForbiddenException(
            "It's forbidden to interact with this resource"
        )

    return jsonify(result.to_dict())
