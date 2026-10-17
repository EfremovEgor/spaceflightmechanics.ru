"""
Django settings for the SciTech Forum backend.

Environment variable names match the previous Go service, so the existing
server .env keeps working (DB_*, EMAIL_*, SERVER_*); Django-specific ones are
prefixed with DJANGO_.
"""

import sys
from pathlib import Path

import environ
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / ".env", overwrite=False)

DEBUG = env.bool("DJANGO_DEBUG", default=False)
SECRET_KEY = env("DJANGO_SECRET_KEY", default="insecure-dev-key" if DEBUG else environ.Env.NOTSET)
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=[".spacescitech.com", "localhost", "127.0.0.1"])
CSRF_TRUSTED_ORIGINS = env.list(
    "DJANGO_CSRF_TRUSTED_ORIGINS",
    default=["https://spacescitech.com", "https://*.spacescitech.com"],
)

# Behind nginx with TLS termination.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
USE_X_FORWARDED_HOST = True
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG

INSTALLED_APPS = [
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.import_export",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "import_export",
    "apps.core",
    "apps.editions",
    "apps.registrations",
    "apps.mailing",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Same Postgres as the Go service; SQLite when DB_NAME is not set (local development, tests).
if env("DB_NAME", default=""):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "HOST": env("DB_HOST", default="localhost"),
            "PORT": env("DB_PORT", default="5432"),
            "USER": env("DB_USER", default=""),
            "PASSWORD": env("DB_PASSWORD", default=""),
            "NAME": env("DB_NAME"),
            "OPTIONS": {"sslmode": env("DB_SSL_MODE", default="disable")},
            "CONN_MAX_AGE": 60,
        }
    }
else:
    DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": BASE_DIR / "db.sqlite3"}}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "ru"
LANGUAGES = [("ru", "Русский"), ("en", "English")]
TIME_ZONE = "Europe/Moscow"
USE_I18N = True
USE_TZ = True

# Everything is served under /api/ so the existing nginx proxy rule covers the admin too.
API_PREFIX = "api/"
ADMIN_PATH = env("DJANGO_ADMIN_PATH", default="api/admin/")
LOGIN_URL = "admin:login"
LOGIN_REDIRECT_URL = f"/{ADMIN_PATH}"
STATIC_URL = "/api/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    # The manifest exists only after collectstatic (in the Docker image), not in tests or local runs.
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"
        if DEBUG or "test" in sys.argv
        else "whitenoise.storage.CompressedManifestStaticFilesStorage"
    },
}

# The registration API is public; the Go service allowed every origin, keep that by default.
CORS_ALLOW_ALL_ORIGINS = env.bool("CORS_ALLOW_ALL_ORIGINS", default=True)
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_THROTTLE_RATES": {"registration": env("REGISTRATION_THROTTLE", default="30/hour")},
    "UNAUTHENTICATED_USER": None,
}

# Initial SMTP values for the admin "SMTP settings" page (same names as the Go service).
SMTP_DEFAULTS = {
    "host": env("EMAIL_HOST", default=""),
    "port": env.int("EMAIL_PORT", default=465),
    "username": env("EMAIL", default=""),
    "password": env("EMAIL_PASSWORD", default=""),
    "from_email": env("EMAIL", default=""),
}
# Key for encrypting the SMTP password in the database; derived from SECRET_KEY when unset.
FIELD_ENCRYPTION_KEY = env("FIELD_ENCRYPTION_KEY", default="")
# Tests send mail synchronously through Django's configured backend instead of the admin SMTP settings.
MAILING_USE_DJANGO_BACKEND = env.bool("MAILING_USE_DJANGO_BACKEND", default=False)
MAILING_SYNC = env.bool("MAILING_SYNC", default=False)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": env("LOG_LEVEL", default="INFO")},
}

UNFOLD = {
    "SITE_TITLE": "SciTech Forum",
    "SITE_HEADER": "SciTech Forum",
    "SITE_SUBHEADER": _("Администрирование"),
    "SITE_URL": env("SITE_URL", default="https://spacescitech.com/"),
    "SITE_SYMBOL": "rocket_launch",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": False,
    "ENVIRONMENT": "apps.core.dashboard.environment_callback",
    "DASHBOARD_CALLBACK": "apps.core.dashboard.dashboard_callback",
    "COLORS": {
        "primary": {
            "50": "oklch(97.1% .013 236.62)",
            "100": "oklch(95.1% .026 236.824)",
            "200": "oklch(90.1% .058 230.902)",
            "300": "oklch(82.8% .111 230.318)",
            "400": "oklch(74.6% .16 232.661)",
            "500": "oklch(68.5% .169 237.323)",
            "600": "oklch(58.8% .158 241.966)",
            "700": "oklch(50% .134 242.749)",
            "800": "oklch(44.3% .11 240.79)",
            "900": "oklch(39.1% .09 240.876)",
            "950": "oklch(29.3% .066 243.157)",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": _("Форум"),
                "items": [
                    {
                        "title": _("Регистрации"),
                        "icon": "how_to_reg",
                        "link": reverse_lazy("admin:registrations_registration_changelist"),
                    },
                    {
                        "title": _("Форумы по годам"),
                        "icon": "calendar_month",
                        "link": reverse_lazy("admin:editions_edition_changelist"),
                    },
                ],
            },
            {
                "title": _("Почта"),
                "items": [
                    {
                        "title": _("Настройки SMTP"),
                        "icon": "settings",
                        "link": reverse_lazy("admin:mailing_smtpsettings_changelist"),
                    },
                    {
                        "title": _("Шаблоны писем"),
                        "icon": "mail",
                        "link": reverse_lazy("admin:mailing_emailtemplate_changelist"),
                    },
                    {
                        "title": _("Журнал отправки"),
                        "icon": "outgoing_mail",
                        "link": reverse_lazy("admin:mailing_emaillog_changelist"),
                    },
                ],
            },
            {
                "title": _("Доступ"),
                "items": [
                    {
                        "title": _("Администраторы"),
                        "icon": "person",
                        "link": reverse_lazy("admin:auth_user_changelist"),
                    },
                    {
                        "title": _("Группы"),
                        "icon": "group",
                        "link": reverse_lazy("admin:auth_group_changelist"),
                    },
                ],
            },
        ],
    },
}
