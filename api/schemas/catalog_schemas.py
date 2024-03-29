from api.schemas.base_schema import APIBaseSchema


class CatalogFilters(APIBaseSchema):
    name: str | None = None
    cost: float | None = None
    description: str | None = None
