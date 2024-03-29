from api.schemas.base_schema import APIBaseSchema


class RegisterUserSchema(APIBaseSchema):
    login: str
    password: str
