
from api.utils.exceptions.base import APIBaseException


class Base400Exception(APIBaseException):
    _default_status_code = 400


class InvalidLoginException(Base400Exception):
    _default_message = "Invalid login provided"


class InvalidPasswordException(Base400Exception):
    _default_message = "Invalid password provided"


class InvalidProductException(Base400Exception):
    _default_message = "Invalid product provided"


class ForbiddenException(Base400Exception):
    _default_message = "Forbidden to interact with this resource"


class RegistrationError(Base400Exception):
    _default_message = "User with the same login exists"


class JWTExpiredError(Base400Exception):
    _default_message = "JWT token is expired"
    _default_status_code = 401


class AuthHeaderUndefined(Base400Exception):
    _default_message = "Authorization header is not provided"
    _default_status_code = 401
