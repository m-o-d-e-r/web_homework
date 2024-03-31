from api.models.product import Products
from api.models.users import Users


def get_product_or_none(product_id: int) -> Products:
    return Products.query.filter_by(product_id=product_id).first()


def get_user_or_none(user_id: int) -> Users:
    return Users.query.filter_by(user_id=user_id).first()
