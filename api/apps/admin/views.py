from flask import request, jsonify

from api.schemas.admin_schemas import CreateProductSchema
from api.models.product import Products
from api.utils.database import db


def add_new_product():
    new_product = Products(
        **CreateProductSchema(
            **request.get_json()
        ).model_dump()
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(
        product_id=new_product.product_id
    )
