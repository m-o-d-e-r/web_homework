from uuid import uuid1
from flask import jsonify, request, send_file
from sqlalchemy import desc

from api.models.product import Products

from api.utils.exceptions import ForbiddenException
from api.utils.query_utils import get_product_or_none
from api.schemas.catalog_schemas import CatalogFilters
from api.utils.auth import require_access_token
from api.utils.mongo_utils import get_file


@require_access_token(admin_access=False)
def get_product_list(user):
    filters = CatalogFilters(
        **request.get_json()
    )

    if filters.in_stock:
        product_query = Products.query

        product_query = product_query.filter(Products.items_count > 0)
        product_query = product_query.filter_by(
            **filters.model_dump(exclude={"in_stock"}, exclude_none=True)
        ).order_by(desc(Products.product_id))

        result: list[Products] = product_query.all()
    else:
        result: list[Products] = Products.query.filter_by(
            **filters.model_dump(
                exclude={"in_stock"},
                exclude_none=True
            )
        ).order_by(desc(Products.product_id)).all()

    return jsonify(
        product_list=[i.to_dict() for i in result]
    )


@require_access_token(admin_access=False)
def get_detail_info(user, product_id: int):
    result = get_product_or_none(product_id)

    if not result:
        raise ForbiddenException(
            "It's forbidden to interact with this resource"
        )

    return jsonify(result.to_dict())


#@require_access_token(admin_access=False)
def get_product_image(
    #user, 
    product_id: int
):
    file_data = get_file(product_id)

    return send_file(
        file_data[0],
        mimetype=file_data[1],
        download_name=uuid1().hex
    )
