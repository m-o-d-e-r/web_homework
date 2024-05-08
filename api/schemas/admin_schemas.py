from pydantic import field_validator

from api.schemas.base_schema import APIBaseSchema


class ItemsCountValidatorMixin:
    @field_validator("items_count")
    @classmethod
    def validate_items_count(cls, v: int):
        if v is None:
            return

        if v < 0:
            raise ValueError("Items count should be equals or greater than zero")

        return v


class ItemsCostValidatorMixin:
    @field_validator("cost")
    @classmethod
    def validate_items_count(cls, v: float):
        if v is None:
            return

        if v <= 0:
            raise ValueError("Product cost should be greater than zero")

        return v


class CreateProductSchema(
    APIBaseSchema,
    ItemsCountValidatorMixin,
    ItemsCostValidatorMixin
):
    name: str = None
    cost: float = None
    description: str = None
    items_count: int = 0


class UpdateProductSchema(
    APIBaseSchema,
    ItemsCountValidatorMixin,
    ItemsCostValidatorMixin
):
    name: str | None = None
    cost: float | None = None
    description: str | None = None
    items_count: int | None = None
