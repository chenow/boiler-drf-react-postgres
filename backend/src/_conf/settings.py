import os
from datetime import timedelta
from pathlib import Path

from .logger import ColoredFormatter

BASE_DIR = Path(__file__).resolve().parent.parent

if os.environ.get("DEBUG", "TRUE") != "FALSE":  # used to load env files for mypy vscode extension
    from dotenv import load_dotenv

    load_dotenv(BASE_DIR / ".." / ".env")
    load_dotenv(BASE_DIR / ".." / ".." / ".env.database")


# Security
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
DEBUG = os.environ["DJANGO_DEBUG"] != "FALSE"
ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["https://*.127.0.0.1"]
CORS_ORIGIN_ALLOW_ALL = True


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "authentication.apps.AuthenticationConfig",
    "mails.apps.MailsConfig",
    "drf_yasg",
]
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# DRF
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}


# JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=14),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUTH_HEADER_TYPES": ("JWT"),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
}


# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ["POSTGRES_DB"],
        "USER": os.environ["POSTGRES_USER"],
        "PASSWORD": os.environ["POSTGRES_PASSWORD"],
        "HOST": os.environ["POSTGRES_HOST"],
        "PORT": os.environ["POSTGRES_PORT"],
    },
}


# Authentification
AUTH_USER_MODEL = "authentication.User"
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Internationalization
LANGUAGE_CODE = "fr-FR"
TIME_ZONE = "Europe/Paris"
USE_I18N = True
USE_TZ = True


# Static and Media files
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "static"
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"


# Logging
LOGGING_DIR = BASE_DIR / "logs"
if not Path.exists(LOGGING_DIR) and not DEBUG:
    Path.mkdir(LOGGING_DIR)
if DEBUG:
    LOGGING = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "colored": {
                "()": ColoredFormatter,
            },
            "colored_time": {
                "()": ColoredFormatter,
                "format": "{levelname} - {asctime} - {module} - {message}",
                "style": "{",
                "datefmt": "%Y-%m-%d %H:%M:%S",
            },
        },
        "root": {
            "handlers": ["console"],
            "level": ("INFO"),
        },
        "handlers": {
            "console": {
                "level": ("INFO"),
                "class": "logging.StreamHandler",
                "formatter": "colored_time",
            },
        },
    }

else:
    LOGGING = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "verbose": {
                "format": "{levelname} {asctime} {module} {message}",
                "style": "{",
            },
        },
        "root": {
            "handlers": ["file"],
            "level": ("INFO"),
        },
        "handlers": {
            "file": {
                "level": ("INFO"),
                "class": "logging.FileHandler",
                "filename": LOGGING_DIR / Path("django.log"),
                "formatter": "verbose",
            },
        },
    }


# Swagger
SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "JWT": {"type": "apiKey", "name": "Authorization", "in": "header"},
    },
    "USE_SESSION_AUTH": True,
    "LOGIN_URL": "authentication:login",
}


# Deployment
WSGI_APPLICATION = "_conf.wsgi.application"


# Other
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
ROOT_URLCONF = "_conf.urls"
TEMPLATES = [  # for admin site
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# Emails
EMAIL_SENDER = os.environ.get("EMAIL_SENDER")
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
