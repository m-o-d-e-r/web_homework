from flask import request, jsonify

from api.schemas.admin_schemas import (
    CreateProductSchema,
    UpdateProductCountSchema,
    RemoveProductSchema
)

from api.models.product import Products

from api.utils.mongo_utils import upload_file, delete_file, get_mongo_table
from api.utils.exceptions import FileUploadingError, DataValidationError
from api.utils.database import db
from api.utils.auth import require_access_token


@require_access_token(admin_access=True)
def add_new_product(user):
    if not request.files:
        raise FileUploadingError()

    if not request.files.get("product_image"):
        raise FileUploadingError("File product_image is not provided")

    product_file = request.files.get("product_image")
    if not product_file.filename:
        raise FileUploadingError("No file provided")

    try:
        product_values = CreateProductSchema(**request.form)

        if product_values.cost <= 0:
            raise DataValidationError()
    except Exception as exc:
        raise DataValidationError() from exc

    new_product = Products(**product_values.model_dump())

    db.session.add(new_product)
    db.session.commit()

    upload_file(
        new_product.product_id,
        product_file.mimetype,
        product_file.stream
    )

    return jsonify(
        product_id=new_product.product_id
    )


@require_access_token(admin_access=True)
def change_product_count(user):
    product_meta = UpdateProductCountSchema(**request.get_json())

    current_product: Products = Products.query.filter(
        Products.product_id == product_meta.product_id
    ).first()
    current_product.items_count = product_meta.items_count

    db.session.commit()


@require_access_token(admin_access=True)
def remove_product(user):
    product_meta = RemoveProductSchema(**request.get_json())

    delete_file(product_meta.product_id)

    get_mongo_table("basket").update_many(
        {
            "products.product_id": product_meta.product_id
        },
        {
            "$pull": {
                "products": {
                    "product_id": product_meta.product_id
                }
            }
        }
    )

    Products.query.filter(
        Products.product_id == product_meta.product_id
    ).delete()

    return jsonify(
        detail="Product deleted successfully"
    )
