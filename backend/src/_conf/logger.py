import logging
from typing import ClassVar


class ColoredFormatter(logging.Formatter):
    # ANSI escape codes for colors
    COLORS: ClassVar[dict[str, str]] = {
        "DEBUG": "\033[94m",  # Blue
        "INFO": "\033[92m",  # Green
        "WARNING": "\033[93m",  # Yellow
        "ERROR": "\033[91m",  # Red
        "CRITICAL": "\033[95m",  # Magenta
    }

    RESET = "\033[0m"  # Reset color

    def format(self, record: logging.LogRecord) -> str:  # noqa: A003
        log_message = super().format(record)
        color = self.COLORS.get(record.levelname, self.RESET)
        return f"{color}{log_message}{self.RESET}"
