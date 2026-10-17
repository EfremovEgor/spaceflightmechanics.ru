#!/bin/sh
# Applies migrations (including the one-time import from the Go tables) and starts the API.
set -e

python manage.py migrate --noinput

HOST="${SERVER_HOST:-127.0.0.1}"
PORT="${SERVER_PORT:-8080}"
# "localhost" listens on both loopback addresses: nginx resolves localhost to ::1 and 127.0.0.1.
if [ "$HOST" = "localhost" ]; then
    set -- --bind "127.0.0.1:$PORT" --bind "[::1]:$PORT"
else
    set -- --bind "$HOST:$PORT"
fi

exec gunicorn config.wsgi:application "$@"     --workers "${GUNICORN_WORKERS:-3}"     --threads 4     --timeout 60     --access-logfile -
