from flask import request, jsonify

from api.schemas.users_schemas import RegisterUserSchema
from api.schemas.auth_schemas import UserLoginSchema
from api.models.users import Users

from api.utils.database import db
from api.utils.auth import (
    create_access_token,
    create_refresh_token,
    require_access_token
)


def register_new_user():
    try:
        new_user = Users(
            **RegisterUserSchema(
                **request.get_json()
            ).model_dump()
        )
    except Exception as e:
        return str(e)

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
        login=json_payload.login,
        password=json_payload.password
    ).first()

    if current_user:
        return jsonify(
            user_id=current_user.user_id,
            access_token=create_access_token(current_user),
            refresh_token=create_refresh_token(current_user)
        )

    return "auth error"


@require_access_token
def loguot_user_handler(user: Users):
    import sys
    print(user, file=sys.stderr)
    return "123"
