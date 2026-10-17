from django.contrib import admin, messages
from django.utils import timezone
from django.utils.text import Truncator
from import_export import fields, resources
from import_export.admin import ExportActionModelAdmin
from unfold.admin import TabularInline
from unfold.contrib.filters.admin import (
    BooleanRadioFilter,
    ChoicesDropdownFilter,
    DropdownFilter,
    RangeDateFilter,
    RelatedDropdownFilter,
)
from unfold.contrib.import_export.forms import ExportForm
from unfold.decorators import action, display

from apps.core.admin_mixins import SectionTitleAdmin
from apps.mailing.models import EmailLog
from apps.mailing.services import send_registration_confirmation

from .models import Registration


class RegistrationResource(resources.ModelResource):
    """Excel/CSV export with Russian column headers."""

    edition = fields.Field(attribute="edition__year", column_name="Год")
    full_name = fields.Field(attribute="full_name", column_name="Имя и фамилия")
    full_name_ru = fields.Field(attribute="full_name_ru", column_name="ФИО на русском")
    email = fields.Field(attribute="email", column_name="Email")
    country = fields.Field(attribute="country", column_name="Страна")
    organization = fields.Field(attribute="organization", column_name="Организация")
    participation_format = fields.Field(attribute="get_participation_format_display", column_name="Формат участия")
    is_presenter = fields.Field(column_name="С докладом")
    paper_title = fields.Field(attribute="paper_title", column_name="Название доклада")
    confchair_paper_id = fields.Field(attribute="confchair_paper_id", column_name="ID доклада в ConfChair")
    language = fields.Field(attribute="language", column_name="Язык")
    created_at = fields.Field(attribute="created_at", column_name="Дата регистрации")

    class Meta:
        model = Registration
        fields = [
            "edition",
            "full_name",
            "full_name_ru",
            "email",
            "country",
            "organization",
            "participation_format",
            "is_presenter",
            "paper_title",
            "confchair_paper_id",
            "language",
            "created_at",
        ]
        export_order = fields

    def dehydrate_is_presenter(self, obj):
        return "Да" if obj.is_presenter else "Нет"

    def dehydrate_created_at(self, obj):
        return timezone.localtime(obj.created_at).strftime("%d.%m.%Y %H:%M")


class CountryFilter(DropdownFilter):
    title = "Страна"
    parameter_name = "country"

    def lookups(self, request, model_admin):
        countries = Registration.objects.order_by("country").values_list("country", flat=True).distinct()
        return [(c, c) for c in countries]

    def queryset(self, request, queryset):
        return queryset.filter(country=self.value()) if self.value() else queryset


class EmailLogInline(TabularInline):
    model = EmailLog
    extra = 0
    can_delete = False
    show_change_link = True
    fields = ["created_at", "status", "subject", "sent_at", "error"]
    readonly_fields = fields
    verbose_name_plural = "Письма"

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Registration)
class RegistrationAdmin(SectionTitleAdmin, ExportActionModelAdmin):
    resource_classes = [RegistrationResource]
    export_form_class = ExportForm

    list_display = [
        "full_name",
        "email",
        "edition_year",
        "country",
        "organization",
        "format_label",
        "is_presenter",
        "paper",
        "language_label",
        "created_at",
    ]
    list_display_links = ["full_name", "email"]
    list_filter = [
        ("edition", RelatedDropdownFilter),
        ("participation_format", ChoicesDropdownFilter),
        ("is_presenter", BooleanRadioFilter),
        ("language", ChoicesDropdownFilter),
        CountryFilter,
        ("created_at", RangeDateFilter),
    ]
    list_filter_submit = True
    list_select_related = ["edition"]
    list_per_page = 50
    search_fields = ["full_name", "full_name_ru", "email", "organization", "paper_title", "confchair_paper_id"]
    search_help_text = "Имя, email, организация или название доклада"
    date_hierarchy = "created_at"
    readonly_fields = ["id", "created_at"]
    actions = ["resend_confirmation"]
    inlines = [EmailLogInline]
    fieldsets = [
        ("Участник", {"fields": ["edition", "full_name", "full_name_ru", "email", "country", "organization"]}),
        ("Участие", {"fields": ["participation_format", "language", "is_presenter", "paper_title", "confchair_paper_id"]}),
        ("Служебное", {"fields": ["id", "created_at"], "classes": ["collapse"]}),
    ]

    @display(description="Год", ordering="edition__year")
    def edition_year(self, obj):
        return obj.edition.year

    @display(description="Формат", label={"Онлайн": "info", "Очно": "success"})
    def format_label(self, obj):
        return obj.get_participation_format_display()

    @display(description="Доклад")
    def paper(self, obj):
        return Truncator(obj.paper_title).chars(60) if obj.paper_title else "—"

    @display(description="Язык", label=True)
    def language_label(self, obj):
        return obj.language.upper()

    @action(description="Отправить письмо-подтверждение ещё раз", icon="forward_to_inbox")
    def resend_confirmation(self, request, queryset):
        sent = sum(1 for registration in queryset.select_related("edition") if send_registration_confirmation(registration))
        self.message_user(request, f"Письма поставлены в очередь: {sent}. Результат — в журнале отправки.", messages.SUCCESS)
