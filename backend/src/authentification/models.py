from __future__ import annotations

import typing as t

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager["User"]):
    def create_user(self, email: str, password: str | None = None, **extra_fields) -> User:
        if not email:
            error_message = "The Email field must be set"
            raise ValueError(error_message)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email: str, password: str | None = None, **extra_fields) -> User:
        extra_fields.setdefault("is_staff")
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None  # type: ignore
    first_name = None  # type: ignore
    last_name: str = None  # type: ignore
    email = models.EmailField(("Adresse mail"), max_length=100, unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: t.ClassVar[list] = []
    objects: UserManager[User] = UserManager()  # type: ignore

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

    class Meta:
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
        ordering: t.ClassVar[list] = ["-date_joined"]

    def __str__(self) -> str:
        return self.email

    def save(self, *args, **kwargs) -> None:
        self.is_staff = self.is_superuser
        super().save(*args, **kwargs)
