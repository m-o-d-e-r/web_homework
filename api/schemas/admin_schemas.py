from dataclasses import dataclass

from api.utils.exceptions import ValueException
from api.utils.mixins import SchemaToDictMixin, HandleUnexpectedArgsMixin


@dataclass
class CreateProductSchema(
    SchemaToDictMixin,
    metaclass=HandleUnexpectedArgsMixin
):
    name: str = None
    cost: float = None
    description: str = None

    def __post_init__(self):
        if not self.name:
            raise ValueException("Product name is invalid.")

        if not self.cost:
            raise ValueException("Product cost is invalid.")

        if not self.description:
            raise ValueException("Product description is invalid.")
