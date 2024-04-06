import logging

from django.conf import settings
from django.template.loader import render_to_string
from python_http_client.client import Response
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

LOGGER = logging.getLogger(__name__)


def send() -> Response | None:
    if not settings.SENDGRID_API_KEY:
        LOGGER.warning("SENDGRID_API_KEY is not set, no mails sent.")
        return None

    email_as_html = render_to_string("mails/signup.html")

    message = Mail(
        from_email=settings.EMAIL_SENDER,
        to_emails="",
        subject="Sending with Twilio SendGrid is Fun",
        html_content=email_as_html,
    ).get()

    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
    response = sg.send(message)

    message.pop("content")
    LOGGER.info("MAIL SENT: %s", message)
    return response  # type: ignore
