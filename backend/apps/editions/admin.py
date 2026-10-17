import re

from django.contrib import admin, messages
from django.db import transaction
from django.db.models import Count
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.html import format_html
from unfold.admin import StackedInline
from unfold.decorators import action, display

from apps.core.admin_mixins import SectionTitleAdmin
from apps.mailing.models import EmailTemplate

from .models import Edition


def ordinal(n: int) -> str:
    suffix = "th" if 10 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suffix}"


def shift_year(value, years: int = 1):
    try:
        return value.replace(year=value.year + years)
    except ValueError:  # 29 February
        return value.replace(year=value.year + years, day=28)


class EmailTemplateInline(StackedInline):
    model = EmailTemplate
    extra = 0
    tab = True
    fields = ["kind", "language", "is_active", "subject", "body_html"]
    verbose_name_plural = "Письма"


@admin.register(Edition)
class EditionAdmin(SectionTitleAdmin):
    list_display = [
        "title_en",
        "year",
        "dates",
        "current_label",
        "registration_label",
        "registrations_link",
        "site_link",
    ]
    list_display_links = ["title_en", "year"]
    search_fields = ["title_en", "title_ru", "slug", "code"]
    readonly_fields = ["created_at", "updated_at"]
    inlines = [EmailTemplateInline]
    actions_detail = ["create_next_edition"]
    fieldsets = [
        ("Форум", {"fields": ["number", "year", "title_en", "title_ru", "start_date", "end_date", "venue_en", "venue_ru"]}),
        ("Регистрация", {"fields": ["is_current", "registration_open", "registration_closes_at"]}),
        ("Адреса", {"fields": ["slug", "code", "site_path"]}),
        ("Служебное", {"fields": ["created_at", "updated_at"], "classes": ["collapse"]}),
    ]

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(registrations_total=Count("registrations"))

    @display(description="Даты", ordering="start_date")
    def dates(self, obj):
        return f"{obj.start_date:%d.%m.%Y} – {obj.end_date:%d.%m.%Y}"

    @display(description="Текущий", label={"Текущий": "success", "Архив": "info"})
    def current_label(self, obj):
        return "Текущий" if obj.is_current else "Архив"

    @display(description="Регистрация", label={"Открыта": "success", "Закрыта": "danger"})
    def registration_label(self, obj):
        return "Открыта" if obj.accepts_registrations() else "Закрыта"

    @display(description="Регистраций", ordering="registrations_total")
    def registrations_link(self, obj):
        url = reverse("admin:registrations_registration_changelist") + f"?edition__id__exact={obj.pk}"
        return format_html('<a href="{}" class="text-primary-600 font-semibold">{}</a>', url, obj.registrations_total)

    @display(description="Сайт")
    def site_link(self, obj):
        return obj.site_path

    @action(description="Создать следующий год", icon="add_circle", url_path="next-edition")
    def create_next_edition(self, request, object_id):
        source = Edition.objects.get(pk=object_id)
        year, number = source.year + 1, source.number + 1
        slug, code = f"scitech-{year}", f"scitech{year}"
        if Edition.objects.filter(slug=slug).exists() or Edition.objects.filter(code=code).exists():
            self.message_user(request, f"Форум {slug} уже существует.", messages.WARNING)
            return redirect(reverse("admin:editions_edition_change", args=[object_id]))

        old, new = ordinal(source.number), ordinal(number)
        retitle = lambda text: re.sub(rf"\b{old}\b", new, text).replace(str(source.year), str(year))  # noqa: E731
        with transaction.atomic():
            edition = Edition.objects.create(
                slug=slug,
                code=code,
                number=number,
                year=year,
                title_en=retitle(source.title_en),
                title_ru=retitle(source.title_ru),
                start_date=shift_year(source.start_date),
                end_date=shift_year(source.end_date),
                venue_en=source.venue_en,
                venue_ru=source.venue_ru,
                site_path="/",
                is_current=False,
                registration_open=False,
            )
            for template in source.email_templates.all():
                EmailTemplate.objects.create(
                    edition=edition,
                    kind=template.kind,
                    language=template.language,
                    subject=retitle(template.subject),
                    body_html=retitle(template.body_html),
                    is_active=template.is_active,
                )
        self.message_user(
            request,
            f"Создан форум {year}. Проверьте даты и тексты писем, затем отметьте его текущим и откройте регистрацию.",
            messages.SUCCESS,
        )
        return redirect(reverse("admin:editions_edition_change", args=[edition.pk]))
