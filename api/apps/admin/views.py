from flask import request, jsonify

from api.schemas.admin_schemas import CreateProductSchema
from api.schemas.product_schemas import ProductImage

from api.models.product import Products

from api.utils.mongo_utils import upload_file
from api.utils.exceptions import FileUploadingError, DataValidationError
from api.utils.database import db
from api.utils.logger import get_logger


def add_new_product():
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
