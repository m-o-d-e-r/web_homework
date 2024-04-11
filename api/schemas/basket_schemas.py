from api.schemas.base_schema import APIBaseSchema


class BasketItemSchema(APIBaseSchema):
    product_id: int
    count: int = 1


class MongoBasketSchema(APIBaseSchema):
    user_id: int
    products: list[BasketItemSchema]


class BasketProductIDSchema(APIBaseSchema):
    product_id: int
