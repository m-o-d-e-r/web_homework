from sqlalchemy import Integer, String, Float, Text, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column

from api.utils.database import db
from api.utils.mixins import ModelToDictMixin


class Products(db.Model, ModelToDictMixin):
    __table_args__ = (
        CheckConstraint("items_count >= 0"),
    )

    product_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(length=25), nullable=False)
    cost: Mapped[float] = mapped_column(Float, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    items_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0
    )

    def __repr__(self) -> str:
        return f"{self.product_id}: {self.name}"
