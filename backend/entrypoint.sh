#!/bin/sh
# Applies migrations (including the one-time import from the Go tables) and starts the API.
set -e

python manage.py migrate --noinput

exec gunicorn config.wsgi:application \
    --bind "${SERVER_HOST:-127.0.0.1}:${SERVER_PORT:-8080}" \
    --workers "${GUNICORN_WORKERS:-3}" \
    --threads 4 \
    --timeout 60 \
    --access-logfile -
