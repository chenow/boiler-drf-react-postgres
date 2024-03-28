from __future__ import annotations

import os
import typing as t

from factory.django import DjangoModelFactory

T = t.TypeVar("T")


class MetaFactory(DjangoModelFactory, t.Generic[T]):
    """
    Is is a workaround for the issue with type hints in DjangoModelFactory.

    Using this class as a base class for a factory class will allow you get the correct type when doing::

        user = UserFactory()
    """

    def __new__(cls, *args, **kwargs) -> T:  # type: ignore
        return super().__new__(*args, **kwargs)

    def save(self, *args, **kwargs) -> None:
        return super().save(*args, **kwargs)  # type: ignore


def get_test_superuser_credentials() -> dict:
    return {
        "email": os.environ.get("SUPER_USER"),
        "password": os.environ.get("SUPER_USER_PASSWORD"),
    }
