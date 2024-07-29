import logging

from django.core.management.base import BaseCommand

from authentication.factories import UserFactory
from authentication.utils import get_test_superuser_credentials

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    command_help = "Populates the database with fake user data"

    def handle(self, *args, **kwargs) -> None:
        users = UserFactory.create_batch(10)
        UserFactory.create(**get_test_superuser_credentials())
        logger.info("Successfully populated the database with %d test users and a super user", len(users))
