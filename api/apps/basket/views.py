from flask import jsonify, request

from api.utils.auth import require_access_token
from api.utils.query_utils import get_product_or_none
from api.utils.mongo_utils import get_mongo_table
from api.schemas.basket_schemas import (
    MongoBasketSchema,
    BasketItemSchema,
    BasketProductIDSchema
)
from api.utils.database import db
from api.utils.exceptions import InvalidProductException
from api.models.users import Users
from api.models.product import Products


@require_access_token(admin_access=False)
def get_basket_by_user_id(user: Users):
    return jsonify(
        **MongoBasketSchema(
            **get_mongo_table("basket").find_one({"user_id": user.user_id})
        ).model_dump()
    )


@require_access_token(admin_access=False)
def check_product_exists(user: Users):
    product_id = BasketProductIDSchema(
        **request.get_json()
    ).product_id

    if not get_product_or_none(product_id):
        raise InvalidProductException()

    return jsonify(
        contains=bool(
            get_mongo_table("basket").find_one(
                {
                    "user_id": user.user_id,
                    "products": {
                        "$elemMatch": {"product_id": product_id}
                    }
                }
            )
        )
    )


@require_access_token(admin_access=False)
def push_to_basket(user: Users):
    new_basket_item = BasketItemSchema(**request.get_json())

    if not get_product_or_none(new_basket_item.product_id):
        raise InvalidProductException()

    user_basket = get_mongo_table("basket").find_one({"user_id": user.user_id})
    if not user_basket:
        get_mongo_table("basket").insert_one(
            {
                "user_id": user.user_id
            },
            {
                "products": [new_basket_item.model_dump()]
            }
        )
        return jsonify(
            detail="Product added successfully"
        )

    product = get_mongo_table("basket").find_one(
        {
            "user_id": user.user_id,
            "products": {
                "$elemMatch": {"product_id": new_basket_item.product_id}
            }
        }
    )
    if product:
        return jsonify(
            detail="Product has bean already added to basket"
        )

    get_mongo_table("basket").update_one(
        {
            "user_id": user.user_id
        },
        {
            "$push": {
                "products": new_basket_item.model_dump()
            }
        }
    )

    return jsonify(
        detail="Product added successfully"
    )


@require_access_token(admin_access=False)
def remove_from_basket(user: Users):
    product_id = BasketProductIDSchema(
        **request.get_json()
    ).product_id

    if not get_product_or_none(product_id):
        raise InvalidProductException()

    get_mongo_table("basket").update_one(
        {
            "user_id": user.user_id
        },
        {
            "$pull": {
                "products": {
                    "product_id": product_id
                }
            }
        }
    )

    return jsonify(
        detail="Product deleted successfully"
    )


@require_access_token(admin_access=False)
def update_product_count(user: Users):
    item_meta = BasketItemSchema(**request.get_json())

    if not get_product_or_none(item_meta.product_id):
        raise InvalidProductException()

    get_mongo_table("basket").update_one(
        {
            "user_id": user.user_id,
            "products.product_id": item_meta.product_id
        },
        {
            "$set": {
                "products.$.count": item_meta.count if item_meta.count > 0 else 1
            }
        }
    )

    return jsonify(
        detail="Basket updated successfully"
    )


@require_access_token(admin_access=False)
def order_products(user: Users):
    product_list = get_mongo_table("basket").find_one(
        {
            "user_id": user.user_id
        }
    ).get("products")

    if not product_list:
        return jsonify(
            detail="No products added to basket"
        )

    for product in product_list:
        product_item: Products = Products.query.filter(
            Products.product_id == product["product_id"]
        ).first()

        if product_item.items_count < product["count"]:
            return jsonify(
                detail=f"Product {product_item.product_id} is out of stock"
            )

    for product in product_list:
        product_item: Products = Products.query.filter(
            Products.product_id == product["product_id"]
        ).first()
        product_item.items_count -= product["count"]
        db.session.commit()

    get_mongo_table("basket").update_one(
        {
            "user_id": user.user_id
        },
        {
            "$set": {"products": []}
        }
    )

    # TODO: call payment system API, for instance

    return jsonify(
        detail="Ok"
    )
