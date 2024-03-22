from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from api.utils.database import db


class Roles(db.Model):
    role_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)

    def __repr__(self) -> str:
        return f"{self.role_id}: {self.name}"
