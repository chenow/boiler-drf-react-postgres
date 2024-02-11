import os


def get_test_superuser_credentials() -> dict:
    return {
        "email": os.environ.get("SUPER_USER"),
        "password": os.environ.get("SUPER_USER_PASSWORD"),
    }
