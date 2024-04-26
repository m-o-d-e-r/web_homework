
from api.utils.exceptions.base import APIBaseException


class Base400Exception(APIBaseException):
    _default_status_code = 400


class InvalidLoginException(Base400Exception):
    _default_status_code = 403
    _default_message = "Invalid login provided"


class InvalidPasswordException(Base400Exception):
    _default_status_code = 403
    _default_message = "Invalid password provided"


class InvalidProductException(Base400Exception):
    _default_status_code = 403
    _default_message = "Invalid product provided"


class ForbiddenException(Base400Exception):
    _default_status_code = 403
    _default_message = "Forbidden to interact with this resource"


class RegistrationError(Base400Exception):
    _default_status_code = 403
    _default_message = "User with the same login exists"


class JWTExpiredError(Base400Exception):
    _default_message = "JWT token is expired"
    _default_status_code = 401


class AuthHeaderUndefined(Base400Exception):
    _default_message = "Authorization header is not provided"
    _default_status_code = 401


class FileUploadingError(Base400Exception):
    _default_message = "Invalid file provided"
    _default_status_code = 406


class InvalidFileNameError(Base400Exception):
    _default_message = "Invalid file name"
    _default_status_code = 403


class DataValidationError(Base400Exception):
    _default_message = "Invalid data provided"
    _default_status_code = 403


class ForbiddenResourceError(Base400Exception):
    _default_message = "Forbidden to interact with this resource"
    _default_status_code = 403
