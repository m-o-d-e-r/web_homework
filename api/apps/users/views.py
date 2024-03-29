from flask import request, jsonify

from api.schemas.users_schemas import RegisterUserSchema
from api.schemas.auth_schemas import UserLoginSchema
from api.models.users import Users

from api.utils.exceptions import RegistrationError, LoginError
from api.utils.hashing import get_hash, compare_password
from api.utils.database import db
from api.utils.auth import (
    create_access_token,
    create_refresh_token,
    require_access_token
)


def register_new_user():
    json_payload = RegisterUserSchema(**request.get_json())

    if Users.query.filter_by(login=json_payload.login):
        raise RegistrationError("User with the same login exists")

    try:
        new_user = Users(
            login=json_payload.login,
            password=get_hash(json_payload.password)
        )
    except Exception as e:
        raise e

    db.session.add(new_user)
    db.session.commit()

    return jsonify(
        user_id=new_user.user_id,
        access_token=create_access_token(new_user),
        refresh_token=create_refresh_token(new_user)
    )


def login_user_handler():
    json_payload = UserLoginSchema(**request.get_json())

    current_user = Users.query.filter_by(
        login=json_payload.login
    ).first()

    if not current_user:
        raise LoginError("Login or password is invalid")

    if not compare_password(current_user.password, json_payload.password):
        raise LoginError("Login or password is invalid")

    return jsonify(
        user_id=current_user.user_id,
        access_token=create_access_token(current_user),
        refresh_token=create_refresh_token(current_user)
    )


@require_access_token
def loguot_user_handler(user: Users):
    import sys
    print(user, file=sys.stderr)
    return "123"