from uuid import uuid1
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import gridfs
from bson.objectid import ObjectId

from api.utils.singleton import Singleton
from api.utils.config_reader import get_config
from api.utils.exceptions import (
    MongoConnectionError,
    Base500Error,
    InvalidFileNameError
)
from api.utils.logger import get_logger

from api.schemas.product_schemas import ProductImage


__AUTH_STRING = f'mongodb://{get_config().API_MONGO_USER}:{get_config().API_MONGO_PASSWORD}@{get_config().API_MONGO_HOST}:{get_config().API_MONGO_PORT}'
print(get_config().API_MONGO_HOST)

class MongoConnector(MongoClient, metaclass=Singleton):
    def __init__(self, host: str, port: int = 27017, **kwargs) -> None:
        super().__init__(host, port, **kwargs)


def get_mongo_cursor():
    mongo_cursor = MongoConnector(__AUTH_STRING)

    try:
        mongo_cursor.admin.command("ping")
    except ServerSelectionTimeoutError as exc:
        get_logger().critical(str(exc))
        raise MongoConnectionError(
            "Some of the services is unavailable, please try late"
        ) from exc
    except Exception as exc:
        get_logger().critical(str(exc))
        raise Base500Error(
            "Some of the services is unavailable, please try late"
        ) from exc

    return mongo_cursor


_MONGO_CURSOR = get_mongo_cursor()
_MONGO_DB_NAME = get_config().API_MONGO_DB


_gridfs_object = gridfs.GridFS(_MONGO_CURSOR[_MONGO_DB_NAME])


def get_mongo_table(table_name: str):
    return _MONGO_CURSOR[_MONGO_DB_NAME][table_name]


def upload_file(product_id: int, mime_type: str, file):
    get_mongo_table("files_metadata").insert_one(
        ProductImage(
            product_id=product_id,
            file_id=str(_gridfs_object.put(file)),
            mime_type=mime_type
        ).model_dump()
    )


def delete_file(product_id: int):
    try:
        file_metadata = get_mongo_table("files_metadata").find_one_and_delete(
            {
                "product_id": product_id
            }
        )
        if file_metadata:
            _gridfs_object.delete(ObjectId(file_metadata["file_id"]))
    except Exception as exc:
        get_logger().error(str(exc))
        raise InvalidFileNameError() from exc


def get_file(product_id: int) -> tuple[str, bytes]:
    try:
        file_metadata = get_mongo_table("files_metadata").find_one(
            {
                "product_id": product_id
            }
        )

        return (
            _gridfs_object.get(
                ObjectId(file_metadata["file_id"])
            ),
            file_metadata["mime_type"]
        )
    except Exception as exc:
        raise InvalidFileNameError() from exc
