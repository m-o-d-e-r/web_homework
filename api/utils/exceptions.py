from werkzeug.exceptions import HTTPException


class ProjectBaseException(HTTPException):
    code = 0
    description = ""


class ForbiddenException(ProjectBaseException):
    code = 403
    description = "Is forbidden to interact with this resource."


class ValueException(ProjectBaseException):
    code = 400
    description = "Bad request, check fields"
