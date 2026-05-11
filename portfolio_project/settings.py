from pathlib import Path
from decouple import config, Csv
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent


# ============================================================
#  SÉCURITÉ
# ============================================================
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1', cast=Csv())

_railway_host = config('RAILWAY_PUBLIC_DOMAIN', default='')
if _railway_host and _railway_host not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(_railway_host)

ALLOWED_HOSTS += ['healthcheck.railway.app', '.railway.app', '.up.railway.app']


# ============================================================
#  APPLICATIONS
# ============================================================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'whitenoise.runserver_nostatic',
    'cloudinary_storage',
    'cloudinary',
    'portfolio',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio_project.wsgi.application'


# ============================================================
#  BASE DE DONNÉES — DATABASE_URL (Railway) ou vars individuelles
# ============================================================
_database_url = config('DATABASE_URL', default='')

if _database_url:
    DATABASES = {'default': dj_database_url.parse(_database_url, conn_max_age=600)}
else:
    _db_options = {}
    _sslmode = config('DB_SSLMODE', default='')
    _sslcert = config('DB_SSLROOTCERT', default='')
    if _sslmode:
        _db_options['sslmode'] = _sslmode
    if _sslcert:
        _db_options['sslrootcert'] = str(BASE_DIR / _sslcert)

    DATABASES = {
        'default': {
            'ENGINE':   config('DB_ENGINE',   default='django.db.backends.sqlite3'),
            'NAME':     config('DB_NAME',     default=str(BASE_DIR / 'db.sqlite3')),
            'USER':     config('DB_USER',     default=''),
            'PASSWORD': config('DB_PASSWORD', default=''),
            'HOST':     config('DB_HOST',     default='localhost'),
            'PORT':     config('DB_PORT',     default='5432'),
            'OPTIONS':  _db_options,
        }
    }


# ============================================================
#  VALIDATION DES MOTS DE PASSE
# ============================================================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ============================================================
#  INTERNATIONALISATION
# ============================================================
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Africa/Casablanca'
USE_I18N = True
USE_TZ = True


# ============================================================
#  FICHIERS STATIQUES & MÉDIAS
# ============================================================
STATIC_URL = config('STATIC_URL', default='/static/')
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

MEDIA_URL = config('MEDIA_URL', default='/media/')
MEDIA_ROOT = BASE_DIR / 'media'

import os as _os
_cloudinary_url = config('CLOUDINARY_URL', default='')
if _cloudinary_url:
    _os.environ['CLOUDINARY_URL'] = _cloudinary_url

STORAGES = {
    'default': {
        'BACKEND': 'cloudinary_storage.storage.RawMediaCloudinaryStorage' if _cloudinary_url else 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
    },
}


# ============================================================
#  EMAIL
# ============================================================
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
CONTACT_RECIPIENT_EMAIL = EMAIL_HOST_USER


# ============================================================
#  CSRF — domaines Railway autorisés
# ============================================================
CSRF_TRUSTED_ORIGINS = config(
    'CSRF_TRUSTED_ORIGINS',
    default='https://*.railway.app,https://*.up.railway.app',
    cast=Csv(),
)


# ============================================================
#  DIVERS
# ============================================================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
