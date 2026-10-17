from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path

from apps.core.views import health
from apps.registrations.views import RegisterView

urlpatterns = [
    path(settings.ADMIN_PATH, admin.site.urls),
    path("api/health", health),
    path("api/v1/", include("apps.editions.urls")),
    # Endpoint used by the existing frontends: /api/scitech2026/register, /api/scitech2025/register.
    re_path(r"^api/(?P<code>[a-z0-9]+)/register/?$", RegisterView.as_view(), name="legacy-register"),
]
