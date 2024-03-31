from flask import jsonify, request

from api.utils.auth import require_access_token
from api.utils.mongo_utils import get_mongo_table
from api.schemas.basket_schemas import (
    MongoBasketSchema,
    PushBasketItemSchema,
    BasketProductIDSchema
)
from api.models.users import Users


@require_access_token
def get_basket_by_user_id(user: Users):
    return jsonify(
        basket=[
            MongoBasketSchema(**i).model_dump()
            for i in get_mongo_table("basket").find({"user_id": user.user_id})
        ]
    )


@require_access_token
def push_to_basket(user: Users):
    new_basket_item = PushBasketItemSchema(**request.get_json())

    item_filter = {
        "user_id": user.user_id,
        "product_id": new_basket_item.product_id
    }

    product = get_mongo_table("basket").find_one(item_filter)
    if product:
        get_mongo_table("basket").update_one(
            item_filter,
            {
                "$inc": {
                    "count": 1
                }
            }
        )
    else:
        get_mongo_table("basket").insert_one(
            MongoBasketSchema(
                user_id=user.user_id,
                **new_basket_item.model_dump()
            ).model_dump()
        )

    return jsonify(
        detail="Product added successfully"
    )


@require_access_token
def remove_from_basket(user: Users):
    get_mongo_table("basket").delete_many(
        {
            "user_id": user.user_id,
            "product_id": BasketProductIDSchema(
                **request.get_json()
            ).product_id
        }
    )

    return jsonify(
        detail="Product deleted successfully"
    )
