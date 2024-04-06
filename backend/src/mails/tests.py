from unittest import skipIf

from django.conf import settings
from rest_framework.test import APITestCase

from .sendgrid import send


@skipIf(settings.SENDGRID_API_KEY is None, "SENDGRID_API_KEY is not set, mails sending won't be tested.")
class MailSendingTestCase(APITestCase):
    def test_send(self) -> None:
        response = send()
        if not response:
            raise Exception("No response")  # noqa:TRY002
        self.assertEqual(response.status_code, 202)
