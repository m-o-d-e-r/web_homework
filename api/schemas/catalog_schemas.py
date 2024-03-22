from dataclasses import dataclass

from api.utils.mixins import SchemaToDictMixin, HandleUnexpectedArgsMixin


@dataclass
class CatalogFilters(
    SchemaToDictMixin,
    metaclass=HandleUnexpectedArgsMixin
):
    name: str | None = None
    cost: float | None = None
    description: str | None = None
