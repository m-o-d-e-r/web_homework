from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

from api.utils.singleton import Singleton


class Base(DeclarativeBase):
    pass


class _DB(SQLAlchemy, metaclass=Singleton):
    ...


def get_db() -> SQLAlchemy:
    return _DB(model_class=Base)


db = get_db()
