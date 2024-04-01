from uuid import uuid4
from datetime import datetime
from functools import wraps

from flask import request
import jwt
from jwt.exceptions import ExpiredSignatureError

from api.models.users import Users
from api.schemas.auth_schemas import JWTTokenPayloadSchema
from api.utils.exceptions import Base400Exception, JWTExpiredError, AuthHeaderUndefined
from api.utils.redis_utils import redis_set_token, redis_load_token
from api.utils.config_reader import get_config
from api.utils.query_utils import get_user_or_none


def load_user(user_id: int) -> Users:
    return get_user_or_none(user_id)


def _extract_from_headers() -> JWTTokenPayloadSchema:
    raw_header = request.headers.get("Authorization")
    if raw_header:
        jwt_token = raw_header.removeprefix("Bearer ")
        return _read_token_payload(jwt_token)

    raise AuthHeaderUndefined()


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
            raise Base400Exception("Invalid refresh token provided")

        return func(load_user(payload.user_id), *args, **kwargs)
    return inner


def _read_token_payload(raw_jwt: str) -> JWTTokenPayloadSchema:
    try:
        return JWTTokenPayloadSchema(
            **dict(
                jwt.decode(
                    raw_jwt,
                    get_config().API_SECRET,
                    algorithms=["HS256"]
                )
            )
        )
    except ExpiredSignatureError as exc:
        raise JWTExpiredError() from exc
    except Exception as exc:
        raise Base400Exception(str(exc)) from exc


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
