from api.schemas.base_schema import APIBaseSchema


class MongoBasketSchema(APIBaseSchema):
    user_id: int
    product_id: int
    count: int = 1


class PushBasketItemSchema(APIBaseSchema):
    product_id: int
    count: int = 1


class BasketProductIDSchema(APIBaseSchema):
    product_id: int
