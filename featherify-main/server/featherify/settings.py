from os import getenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "k^=9w^ho#qon6@#-sj0dtvs8cz-a^g0_=yf$(2c4afi)2z53ax"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = getenv("DEBUG", "TRUE") == "TRUE"

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    "dtam87cvk4.execute-api.us-east-2.amazonaws.com",
]

INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "rest_framework",
    "corsheaders",
    "manipulator",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "featherify.urls"

TEMPLATES = [
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

WSGI_APPLICATION = "featherify.wsgi.application"

# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# CORS

CORS_ALLOW_ALL_ORIGINS = True


REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",)
}
