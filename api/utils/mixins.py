from typing import Any

from sqlalchemy.orm import class_mapper, ColumnProperty


class ModelToDictMixin:
    def to_dict(self) -> dict[str, Any]:
        result: dict[str, Any] = {}
        for prop in class_mapper(self.__class__).iterate_properties:
            if isinstance(prop, ColumnProperty):
                result[prop.key] = getattr(self, prop.key)

        return result
