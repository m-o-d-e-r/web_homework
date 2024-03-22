from flask import request, jsonify

from api.schemas.admin_schemas import CreateProductSchema
from api.models.product import Products
from api.utils.database import db


def add_new_product():
    raw_data = request.get_json()
    if raw_data:
        new_product = Products(**CreateProductSchema(**raw_data).to_dict())

        db.session.add(new_product)
        db.session.commit()

        return jsonify(
            product_id=new_product.product_id
        )
