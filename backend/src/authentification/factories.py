import factory
from django.contrib.auth.hashers import make_password

from utils import MetaFactory

from .models import User


class UserFactory(MetaFactory[User]):
    email = factory.Faker("email")
    is_active = True
    is_staff = False
    is_superuser = False

    @factory.post_generation
    def password(self, create: bool, extracted: str | None, **kwargs) -> None:
        if not create or extracted is None:
            return

        self.password = make_password(extracted)  # type: ignore
        self.save()

    class Meta:
        model = User
        django_get_or_create = ["email"]
