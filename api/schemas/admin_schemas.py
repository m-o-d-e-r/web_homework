from pydantic import field_validator

from api.schemas.base_schema import APIBaseSchema


class ItemsCountValidatorMixin:
    @field_validator("items_count")
    @classmethod
    def validate_items_count(cls, v: int):
        if v < 0:
            raise ValueError("Items count should be equals or greater than zero")

        return v


class CreateProductSchema(APIBaseSchema, ItemsCountValidatorMixin):
    name: str = None
    cost: float = None
    description: str = None
    items_count: int = 0


class UpdateProductCountSchema(APIBaseSchema, ItemsCountValidatorMixin):
    product_id: int
    items_count: int


class RemoveProductSchema(APIBaseSchema):
    product_id: int
