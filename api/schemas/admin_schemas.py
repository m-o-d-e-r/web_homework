from api.schemas.base_schema import APIBaseSchema


class CreateProductSchema(APIBaseSchema):
    name: str = None
    cost: float = None
    description: str = None
