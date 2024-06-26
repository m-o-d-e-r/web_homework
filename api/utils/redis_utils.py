import redis

from api.utils.config_reader import get_config
from api.utils.logger import get_logger


_redis_object = redis.Redis(
    host=get_config().API_REDIS_HOST,
    port=get_config().API_REDIS_PORT,
    decode_responses=True
)


@get_logger().catch()
def redis_set_token(key, value, ttl: int = 3000):
    _redis_object.set(key, value)
    _redis_object.expire(key, ttl)


@get_logger().catch()
def redis_load_token(key):
    raw_payload: str = _redis_object.get(key)
    if raw_payload:
        return raw_payload


@get_logger().catch()
def redis_delete_token(key):
    _redis_object.delete(key)
