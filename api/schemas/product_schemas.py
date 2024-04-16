from api.schemas.base_schema import APIBaseSchema


class ProductImage(APIBaseSchema):
    product_id: int
    file_id: str
    mime_type: str
