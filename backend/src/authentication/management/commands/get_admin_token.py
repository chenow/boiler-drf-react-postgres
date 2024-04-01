import logging
import os

from django.conf import settings
from django.core.management.base import BaseCommand
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.models import User

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    command_help = "Get token for admin user specified in the environment variable SUPER_USER"

    def handle(self, *args, **kwargs) -> None:
        if not settings.DEBUG:
            raise ValueError("This command can only be run in DEBUG mode")

        admin_user = User.objects.get(email=os.environ["SUPER_USER"])
        token = RefreshToken.for_user(admin_user)
        logger.info("Token for admin user %s:\n\n%s", admin_user, token)
