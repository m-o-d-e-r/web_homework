import hashlib


def get_hash(data: str) -> str:
    return hashlib.sha512(data.encode()).hexdigest()


def compare_password(password_hash: str, password_candidate: str) -> bool:
    return password_hash == get_hash(password_candidate)
