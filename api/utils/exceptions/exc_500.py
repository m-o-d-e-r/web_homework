from api.utils.exceptions.base import APIBaseException


class Base500Error(APIBaseException):
    _default_message = "An error ocurred on server side"
    _default_status_code = 500


class RedisConnectionError(APIBaseException):
    ...


class MongoConnectionError(APIBaseException):
    ...


class PostgreConnectionError(APIBaseException):
    ...
