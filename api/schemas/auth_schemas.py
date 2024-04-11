from api.schemas.base_schema import APIBaseSchema


class JWTTokenPayloadSchema(APIBaseSchema):
    user_id: int
    login: str
    role_name: str
    jti: str
    iat: float
    exp: float


class UserLoginSchema(APIBaseSchema):
    login: str
    password: str
