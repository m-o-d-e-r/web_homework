from api.utils.auth import create_access_token, read_token_payload
from api.models.users import Users


token = create_access_token(
    Users(user_id=8, login="123", password="1111")
)

print(read_token_payload("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJsb2dpbiI6InEiLCJqdGkiOiI1NmVhNWYyODc3ZTU0ZjI2OWI4MmZhZTRiZTcyNTdlOCIsImlhdCI6MTcxMTcwODk5NC4zOTczNTksImV4cCI6MTcxMTcwOTk5NC4zOTczNTl9.NUrVqCrzxEHBJJ1MY8xsOZ7nMZfL1C2Hipm9NbY6gH4"))
