from flask import jsonify, request

from api.models.product import Products
from api.utils.exceptions import ForbiddenException
from api.schemas.catalog_schemas import CatalogFilters


def get_product_list():
    result: list[Products] = Products.query.filter_by(
        **CatalogFilters(**request.get_json()).to_dict(ignore_none=False)
    ).all()

    return jsonify(
        product_list=[i.to_dict() for i in result]
    )


def get_detail_info(product_id: int):
    result = Products.query.filter_by(product_id=product_id).first()

    if not result:
        raise ForbiddenException()

    return jsonify(result.to_dict())
