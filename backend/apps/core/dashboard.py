from datetime import timedelta

from django.conf import settings
from django.db.models import Count, Q
from django.urls import reverse
from django.utils import timezone

from apps.editions.models import Edition
from apps.mailing.models import EmailLog
from apps.registrations.models import Registration


def environment_callback(request):
    return ["Разработка", "warning"] if settings.DEBUG else None


def dashboard_callback(request, context):
    """Numbers for the admin home page: the current forum first, then every year."""
    edition = Edition.current() or Edition.objects.first()
    registrations_url = reverse("admin:registrations_registration_changelist")
    week_ago = timezone.now() - timedelta(days=7)

    kpis, countries, recent = [], [], []
    if edition:
        qs = Registration.objects.filter(edition=edition)
        totals = qs.aggregate(
            total=Count("id"),
            presenters=Count("id", filter=Q(is_presenter=True)),
            online=Count("id", filter=Q(participation_format=Registration.Format.ONLINE)),
            offline=Count("id", filter=Q(participation_format=Registration.Format.OFFLINE)),
            week=Count("id", filter=Q(created_at__gte=week_ago)),
        )
        base = f"{registrations_url}?edition__id__exact={edition.pk}"
        kpis = [
            {"title": "Всего регистраций", "value": totals["total"], "footer": f"+{totals['week']} за 7 дней", "href": base},
            {"title": "С докладом", "value": totals["presenters"], "href": f"{base}&is_presenter=1"},
            {"title": "Очно", "value": totals["offline"], "href": f"{base}&participation_format__exact=offline"},
            {"title": "Онлайн", "value": totals["online"], "href": f"{base}&participation_format__exact=online"},
        ]
        top = qs.values("country").annotate(n=Count("id")).order_by("-n")[:8]
        total = totals["total"] or 1
        countries = [{"title": c["country"], "value": c["n"], "percent": round(c["n"] * 100 / total)} for c in top]
        recent = qs.order_by("-created_at")[:8]

    editions = Edition.objects.annotate(
        total=Count("registrations"),
        presenters=Count("registrations", filter=Q(registrations__is_presenter=True)),
    )
    failed = EmailLog.objects.filter(status=EmailLog.Status.FAILED, created_at__gte=week_ago).count()

    context.update(
        {
            "edition": edition,
            "kpis": kpis,
            "countries": countries,
            "recent": recent,
            "editions": editions,
            "failed_emails": failed,
            "failed_emails_url": reverse("admin:mailing_emaillog_changelist") + "?status__exact=failed",
            "registrations_url": registrations_url,
        }
    )
    return context
