
class ProjectBaseException(Exception):
    ...


class RegistrationError(ProjectBaseException):
    ...


class LoginError(ProjectBaseException):
    ...


class ForbiddenException(ProjectBaseException):
    ...


class ValueException(ProjectBaseException):
    ...


class MissingArgsException(ProjectBaseException):
    ...
