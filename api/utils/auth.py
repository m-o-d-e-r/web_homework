from uuid import uuid4
from datetime import datetime
from functools import wraps

from flask import request
import jwt

from api.models.users import Users
from api.schemas.auth_schemas import JWTTokenPayloadSchema
from api.utils.redis_utils import redis_set_token, redis_load_token
from api.utils.config_reader import get_config


def load_user(user_id: int) -> Users:
    return Users.query.filter_by(user_id=user_id).first()


def _extract_from_headers() -> JWTTokenPayloadSchema:
    raw_header = request.headers.get("Authorization")
    if raw_header:
        jwt_token = raw_header.removeprefix("Bearer ")
        return _read_token_payload(jwt_token)


def require_access_token(func) -> JWTTokenPayloadSchema:
    @wraps(func)
    def inner(*args, **kwargs):
        return func(load_user(_extract_from_headers().user_id), *args, **kwargs)
    return inner


def require_refresh_token(func) -> JWTTokenPayloadSchema:
    @wraps(func)
    def inner(*args, **kwargs):
        payload = _extract_from_headers()

        if not redis_load_token(_make_token_key(payload)):
            raise Exception("Bad auth")

        return func(load_user(payload.user_id), *args, **kwargs)
    return inner


def _read_token_payload(raw_jwt: str) -> JWTTokenPayloadSchema:
    return JWTTokenPayloadSchema(
        **dict(jwt.decode(raw_jwt, get_config().API_SECRET, algorithms=["HS256"]))
    )


def _make_token_key(token_payload: JWTTokenPayloadSchema) -> str:
    return f"{token_payload.user_id}_{token_payload.jti}"


def _create_jwt_token(user: Users, ttl: float) -> str:
    creation_time = datetime.now().timestamp()
    jwt_payload = JWTTokenPayloadSchema(
        user_id=user.user_id,
        login=user.login,
        jti=uuid4().hex,
        iat=creation_time,
        exp=creation_time + ttl
    )
    return jwt.encode(
        jwt_payload.model_dump(),
        get_config().API_SECRET,
        algorithm="HS256"
        ), jwt_payload


def create_access_token(user: Users) -> str:
    return _create_jwt_token(user, 1000)[0]


def create_refresh_token(user: Users) -> str:
    token_data = _create_jwt_token(user, 3000)
    redis_set_token(_make_token_key(token_data[1]), token_data[0])
    return token_data[0]
