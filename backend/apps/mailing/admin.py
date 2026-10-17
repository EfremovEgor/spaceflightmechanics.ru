from django import forms
from django.contrib import admin, messages
from django.shortcuts import redirect
from django.urls import reverse
from django.utils import timezone
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.contrib.filters.admin import ChoicesDropdownFilter, RangeDateFilter, RelatedDropdownFilter
from unfold.decorators import action, display
from unfold.widgets import UnfoldAdminPasswordToggleWidget

from apps.core.admin_mixins import SectionTitleAdmin
from apps.registrations.models import Registration

from .models import EmailLog, EmailTemplate, SmtpSettings
from .services import render_template, resend, send_message

STATUS_COLORS = {"В очереди": "warning", "Отправлено": "success", "Ошибка": "danger"}


def html_preview(html: str):
    return format_html(
        '<iframe srcdoc="{}" sandbox="" style="width:100%;min-height:360px;border:1px solid rgba(127,127,127,.3);'
        'border-radius:8px;background:#fff"></iframe>',
        html,
    )


class SmtpSettingsForm(forms.ModelForm):
    password = forms.CharField(
        label="Пароль",
        required=False,
        widget=UnfoldAdminPasswordToggleWidget(render_value=False),
        help_text="Оставьте пустым, чтобы не менять сохранённый пароль.",
    )

    class Meta:
        model = SmtpSettings
        fields = "__all__"

    def clean_password(self):
        value = self.cleaned_data.get("password")
        return value if value else (self.instance.password if self.instance.pk else "")


@admin.register(SmtpSettings)
class SmtpSettingsAdmin(ModelAdmin):
    form = SmtpSettingsForm
    actions_detail = ["send_test_email"]
    readonly_fields = ["updated_at"]
    fieldsets = [
        ("Сервер", {"fields": ["enabled", "host", "port", "security", "timeout"]}),
        ("Учётная запись", {"fields": ["username", "password"]}),
        ("Отправитель", {"fields": ["from_name", "from_email", "reply_to"]}),
        ("Служебное", {"fields": ["updated_at"], "classes": ["collapse"]}),
    ]

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        return redirect(reverse("admin:mailing_smtpsettings_change", args=[SmtpSettings.load().pk]))

    @action(description="Отправить тестовое письмо", icon="send", url_path="send-test")
    def send_test_email(self, request, object_id):
        smtp = SmtpSettings.load()
        to = request.user.email or smtp.from_email
        back = redirect(reverse("admin:mailing_smtpsettings_change", args=[object_id]))
        if not to:
            self.message_user(request, "Укажите email в своём профиле администратора: туда придёт тестовое письмо.", messages.ERROR)
            return back
        try:
            send_message(
                to,
                "SciTech Forum: проверка SMTP",
                f"<p>Тестовое письмо из админки SciTech Forum.</p><p>{timezone.localtime():%d.%m.%Y %H:%M}</p>",
                smtp=smtp,
            )
        except Exception as exc:
            self.message_user(request, f"Не удалось отправить письмо на {to}: {exc}", messages.ERROR)
        else:
            self.message_user(request, f"Тестовое письмо отправлено на {to}.", messages.SUCCESS)
        return back


@admin.register(EmailTemplate)
class EmailTemplateAdmin(SectionTitleAdmin):
    list_display = ["edition", "kind", "language_label", "subject", "is_active"]
    list_filter = [("edition", RelatedDropdownFilter), ("language", ChoicesDropdownFilter)]
    list_filter_submit = True
    readonly_fields = ["preview", "updated_at"]
    fieldsets = [
        (None, {"fields": ["edition", "kind", "language", "is_active", "subject", "body_html"]}),
        ("Предпросмотр", {"fields": ["preview"]}),
    ]

    @display(description="Язык", label=True)
    def language_label(self, obj):
        return obj.language.upper()

    @display(description="Как увидит участник")
    def preview(self, obj):
        if not obj.pk:
            return "Предпросмотр появится после сохранения."
        sample = Registration(
            edition=obj.edition,
            full_name="Ivan Petrov",
            email="ivan.petrov@example.com",
            country="Russian Federation",
            organization="RUDN University",
            participation_format=Registration.Format.OFFLINE,
            is_presenter=True,
            paper_title="Low-thrust transfers to lunar orbits",
            language=obj.language,
        )
        try:
            subject, body = render_template(obj, sample)
        except Exception as exc:
            return f"Ошибка в шаблоне: {exc}"
        return format_html("<p><strong>{}</strong></p>{}", subject, html_preview(body))


@admin.register(EmailLog)
class EmailLogAdmin(SectionTitleAdmin):
    list_display = ["created_at", "status_label", "to_email", "subject", "sent_at"]
    list_filter = [("status", ChoicesDropdownFilter), ("created_at", RangeDateFilter)]
    list_filter_submit = True
    search_fields = ["to_email", "subject"]
    date_hierarchy = "created_at"
    actions = ["resend_selected"]
    fields = ["status", "to_email", "subject", "registration", "created_at", "sent_at", "error", "preview"]
    readonly_fields = fields

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    @display(description="Статус", label=STATUS_COLORS)
    def status_label(self, obj):
        return obj.get_status_display()

    @display(description="Письмо")
    def preview(self, obj):
        return html_preview(obj.body_html)

    @action(description="Отправить ещё раз", icon="refresh")
    def resend_selected(self, request, queryset):
        for log in queryset:
            resend(log)
        self.message_user(request, f"Повторная отправка поставлена в очередь: {queryset.count()}.", messages.SUCCESS)
