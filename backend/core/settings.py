#settings.py
import os
from pathlib import Path
from datetime import timedelta
# BASE DIR
BASE_DIR = Path(__file__).resolve().parent.parent

# ✅ SECRET KEY
SECRET_KEY = "@%wt8$80ar$mwubpn2ap-8plup(h^&%g+@8d!cr3(xdqge5d-e"

# ✅ DEBUG MODE
DEBUG = True

# ✅ ALLOWED HOSTS
ALLOWED_HOSTS = ["*"]

# ✅ INSTALLED APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    'apps.notifications',
    'apps.audit',
    'apps.auth_app',
    'apps.users',
]

# ✅ MIDDLEWARE
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ✅ URLS
ROOT_URLCONF = 'core.urls'

# ✅ TEMPLATES (needed for admin)
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
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

# ✅ WSGI
WSGI_APPLICATION = 'core.wsgi.application'

# ✅ DATABASE (PostgreSQL)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "emr_npa_db",
        "USER": "emradmin",
        "PASSWORD": "emradmin",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
#static
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")


# ✅ CORS: Allow frontend origin + allow cookies
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # your Next.js dev server
]
CORS_ALLOW_CREDENTIALS = True

# ✅ REST FRAMEWORK with JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'apps.auth_app.authentication.CookieJWTAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# ✅ Use your custom User model
AUTH_USER_MODEL = 'users.User'

# ✅ DEFAULT AUTO FIELD
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


import sys

# For test DB: fallback to SQLite if not root user
if "test" in sys.argv:
    DATABASES["default"] = {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db_test.sqlite3",
    }


    # token lifetime
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
}