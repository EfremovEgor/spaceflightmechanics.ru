FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN DJANGO_SECRET_KEY=collectstatic-only python manage.py collectstatic --noinput \
    && useradd --system --home /app app \
    && chown -R app /app
USER app

CMD ["sh", "entrypoint.sh"]
