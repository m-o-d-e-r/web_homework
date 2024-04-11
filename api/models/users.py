from datetime import datetime

from sqlalchemy import Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from api.utils.database import db
from api.utils.mixins import ModelToDictMixin
from api.models.roles import Roles


class Users(db.Model, ModelToDictMixin):
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    role_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("roles.role_id"),
        default=1,
        nullable=False
    )
    login: Mapped[str] = mapped_column(
        String(length=25),
        nullable=False,
        unique=True
    )
    password: Mapped[str] = mapped_column(String, nullable=False)
    registered: Mapped[str] = mapped_column(
        DateTime,
        default=datetime.now
    )

    role = db.relationship(Roles)

    def __repr__(self) -> str:
        return f"{self.user_id}: {self.login}"
