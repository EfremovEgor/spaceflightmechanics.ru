# SciTech Forum backend

Django 5.2 + Django REST Framework + [Unfold](https://unfoldadmin.com/) admin. Replaces the Go service
from the `backend` branch: same database, same `.env` variables, same registration endpoints.

## What is where

| Admin section | What it is for |
| --- | --- |
| Форум → Регистрации | All registrations; filters by year, format, language, country, date; search; export to Excel/CSV; resend the confirmation email |
| Форум → Форумы по годам | One row per forum year: dates, titles (EN/RU), registration open/closed, current year, confirmation email texts (EN/RU tabs). The **Создать следующий год** button copies a year with number, dates and email texts moved forward |
| Почта → Настройки SMTP | Mail server, login and password (stored encrypted), sender; **Отправить тестовое письмо** sends to your admin email |
| Почта → Шаблоны писем | Confirmation emails per year and language, with a live preview |
| Почта → Журнал отправки | Every email with its status and error; failed ones can be resent |

The home page of the admin shows the current year: totals, presenters, on-site/online, new registrations, countries.

## API

Everything is under `/api/`, so the existing nginx rule that proxies `/api/` to `SERVER_PORT` also serves the admin.

| Method and path | Purpose |
| --- | --- |
| `POST /api/<code>/register` | Registration used by the sites (`scitech2026`, `scitech2025`). Request and response are the same as in the Go service; `language` (`en`/`ru`) is optional and picks the email language |
| `POST /api/v1/editions/<slug>/register/` | Same, by slug (`scitech-2026`) |
| `GET /api/v1/editions/` | Forum years: dates, titles, site path, whether registration is open |
| `GET /api/health` | Liveness check |
| `/api/admin/` | Admin |

Responses keep the Go envelope `{"success", "message", "data"}`. Codes: `201` registered, `400` invalid input
(`errors` lists the fields), `403` registration closed, `409` email already registered for that year
(case-insensitive), `404` unknown year.

## Local development

```bash
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt   # .venv/bin/pip on Linux/macOS
DJANGO_DEBUG=1 .venv/Scripts/python manage.py migrate
DJANGO_DEBUG=1 .venv/Scripts/python manage.py createsuperuser
DJANGO_DEBUG=1 .venv/Scripts/python manage.py runserver 8000
DJANGO_DEBUG=1 .venv/Scripts/python manage.py test
```

Without `DB_NAME` the backend uses SQLite. Set the `DB_*` variables to work against Postgres.

## Moving the server from the Go service (once)

The Go service runs from `/var/www/spacescitech.com/backend` (branch `backend`). The new backend lives in
`backend/` of the main repository, i.e. `/var/www/spacescitech.com/frontend/backend`.

1. Copy the environment file and add the Django variables (see `.env.example`):
   ```bash
   cp /var/www/spacescitech.com/backend/.env /var/www/spacescitech.com/frontend/backend/.env
   # add DJANGO_SECRET_KEY (long random string), check DJANGO_ALLOWED_HOSTS and DJANGO_CSRF_TRUSTED_ORIGINS
   ```
2. Stop the Go service (both listen on `SERVER_PORT`):
   ```bash
   cd /var/www/spacescitech.com/backend && docker compose down
   ```
3. Start the new one. On start it runs migrations: creates the 2025 and 2026 years, the email templates, and copies
   all registrations from `scitech_2025_registration` and `scitech_2026_registration` (ids and dates are kept; the old
   tables are not changed):
   ```bash
   cd /var/www/spacescitech.com/frontend/backend && docker compose up --build -d
   docker compose logs -f api
   ```
4. Create an admin and check the SMTP settings page (it is filled from `EMAIL_*` on first open):
   ```bash
   docker compose exec api python manage.py createsuperuser
   ```
5. If the Go service kept taking registrations after step 3, copy the new rows again (already copied ones are skipped):
   ```bash
   docker compose exec api python manage.py import_legacy_registrations
   ```

After that, pushes to `master` that touch `backend/` redeploy it (`.github/workflows/deploy-backend.yml`).

## A new forum year

1. Admin → Форумы по годам → open the current year → **Создать следующий год**.
2. Check dates, titles and email texts of the new year, tick **Текущий форум** and **Регистрация открыта**.
3. Close registration on the previous year if it is still open.
4. The new site posts registrations to `/api/scitech<year>/register`. The previous site is archived under
   `/previous/scitech-<year>/` (see `previous/README.md` in the repository root).
