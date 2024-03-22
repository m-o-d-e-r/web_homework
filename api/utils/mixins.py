from typing import Any

from sqlalchemy.orm import class_mapper, ColumnProperty


class ModelToDictMixin:
    def to_dict(self) -> dict[str, Any]:
        result: dict[str, Any] = {}
        for prop in class_mapper(self.__class__).iterate_properties:
            if isinstance(prop, ColumnProperty):
                result[prop.key] = getattr(self, prop.key)

        return result


class SchemaToDictMixin:
    def to_dict(self, *, ignore_none: bool = True) -> dict[str, Any]:
        if ignore_none:
            return {key: getattr(self, key) for key in self.__annotations__.keys()}

        return {
            key: getattr(self, key) for key in self.__annotations__.keys() if getattr(self, key)
        }


class HandleUnexpectedArgsMixin(type):
    def __call__(cls, *args, **kwargs):
        new_kwargs = {}
        for key, value in kwargs.items():
            if cls.__annotations__.get(key):
                new_kwargs[key] = value

        return super().__call__(*args, **new_kwargs)
