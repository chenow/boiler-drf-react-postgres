import logging
import os

from django.core.management.base import BaseCommand
from django_seed import Seed

from authentification.models import User

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Populates the database with fake user data"

    def handle(self, *args, **kwargs) -> None:
        seeder = Seed.seeder()
        test_users_emails = [seeder.faker.email() for _ in range(10)]
        self.create_test_users(test_users_emails)

        super_users_email = os.environ.get("SUPER_USERS_EMAILS", "").split(",")
        self.create_superusers(super_users_email)

        logger.info(
            "Successfully populated the database with %d test users and %d super users",
            len(test_users_emails),
            len(super_users_email),
        )

    def create_superusers(self, emails: list[str]) -> None:
        for email in emails:
            super_user: User = User.objects.create_superuser(
                email=email,
                password=os.environ["SUPER_USERS_PASSWORD"],
            )
            super_user.save()

    def create_test_users(self, emails: list[str]) -> None:
        for email in emails:
            super_user: User = User.objects.create_user(
                email=email,
                password=os.environ["TEST_USERS_PASSWORD"],
            )
            super_user.save()
