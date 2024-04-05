from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

from api.utils.singleton import Singleton
from api.utils.config_reader import get_config
from api.utils.exceptions import MongoConnectionError, Base500Error


__AUTH_STRING = f'mongodb://{get_config().API_MONGO_USER}:{get_config().API_MONGO_PASSWORD}@{get_config().API_MONGO_HOST}:{get_config().API_MONGO_PORT}'


class MongoConnector(MongoClient, metaclass=Singleton):
    def __init__(self, host: str, port: int = 27017, **kwargs) -> None:
        super().__init__(host, port, **kwargs)


def get_mongo_cursor():
    mongo_cursor = MongoConnector(__AUTH_STRING)

    try:
        mongo_cursor.admin.command("ping")
    except ServerSelectionTimeoutError as exc:
        raise MongoConnectionError(
            "Some of the services is unavailable, please try late"
        ) from exc
    except Exception as exc:
        raise Base500Error(
            "Some of the services is unavailable, please try late"
        ) from exc

    return mongo_cursor


_MONGO_CURSOR = get_mongo_cursor()
_MONGO_DB_NAME = get_config().API_MONGO_DB


def get_mongo_table(table_name: str):
    return _MONGO_CURSOR[_MONGO_DB_NAME][table_name]
