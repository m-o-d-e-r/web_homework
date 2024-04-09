from api.schemas.base_schema import APIBaseSchema


class CatalogFilters(APIBaseSchema):
    product_id: int = None
    name: str | None = None
    cost: float | None = None
