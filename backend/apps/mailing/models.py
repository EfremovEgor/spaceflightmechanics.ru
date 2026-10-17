from django.conf import settings
from django.db import models

from apps.core.fields import EncryptedTextField
from apps.editions.models import Edition


class SmtpSettings(models.Model):
    """Outgoing mail server, edited in the admin. A single row (pk=1)."""

    class Security(models.TextChoices):
        SSL = "ssl", "SSL/TLS (обычно порт 465)"
        STARTTLS = "starttls", "STARTTLS (обычно порт 587)"
        NONE = "none", "Без шифрования"

    enabled = models.BooleanField(
        "Отправка включена",
        default=True,
        help_text="Если выключено, письма не отправляются, а в журнале отмечаются как неотправленные.",
    )
    host = models.CharField("SMTP-сервер", max_length=255, blank=True)
    port = models.PositiveIntegerField("Порт", default=465)
    security = models.CharField("Шифрование", max_length=16, choices=Security.choices, default=Security.SSL)
    username = models.CharField("Логин", max_length=255, blank=True)
    password = EncryptedTextField("Пароль", blank=True, help_text="Хранится в базе в зашифрованном виде.")
    from_email = models.EmailField("Адрес отправителя", blank=True)
    from_name = models.CharField("Имя отправителя", max_length=255, blank=True, default="SciTech Forum")
    reply_to = models.EmailField("Адрес для ответа", blank=True)
    timeout = models.PositiveSmallIntegerField("Таймаут, с", default=20)
    updated_at = models.DateTimeField("Изменено", auto_now=True)

    class Meta:
        verbose_name = "настройки SMTP"
        verbose_name_plural = "настройки SMTP"

    def __str__(self):
        return "Настройки SMTP"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls) -> "SmtpSettings":
        """The settings row, created from the EMAIL_* environment variables on first use."""
        obj = cls.objects.filter(pk=1).first()
        if obj is None:
            defaults = settings.SMTP_DEFAULTS
            obj = cls(
                pk=1,
                host=defaults["host"],
                port=defaults["port"],
                security=cls.Security.SSL if defaults["port"] == 465 else cls.Security.STARTTLS,
                username=defaults["username"],
                password=defaults["password"],
                from_email=defaults["from_email"],
            )
            obj.save()
        return obj

    @property
    def sender(self) -> str:
        address = self.from_email or self.username
        return f"{self.from_name} <{address}>" if self.from_name and address else address


class EmailTemplate(models.Model):
    class Kind(models.TextChoices):
        REGISTRATION_CONFIRMATION = "registration_confirmation", "Подтверждение регистрации"

    edition = models.ForeignKey(Edition, on_delete=models.CASCADE, related_name="email_templates", verbose_name="Форум")
    kind = models.CharField("Тип письма", max_length=64, choices=Kind.choices, default=Kind.REGISTRATION_CONFIRMATION)
    language = models.CharField("Язык", max_length=2, choices=[("en", "English"), ("ru", "Русский")], default="en")
    subject = models.CharField("Тема", max_length=255)
    body_html = models.TextField(
        "Текст письма (HTML)",
        help_text=(
            "Синтаксис шаблонов Django. Доступно: {{ full_name }}, {{ email }}, {{ edition_title }}, "
            "{{ edition.number }}, {{ edition.year }}, {{ registration.paper_title }}, "
            "{{ registration.get_participation_format_display }}."
        ),
    )
    is_active = models.BooleanField("Используется", default=True)
    updated_at = models.DateTimeField("Изменён", auto_now=True)

    class Meta:
        verbose_name = "шаблон письма"
        verbose_name_plural = "шаблоны писем"
        ordering = ["-edition__year", "kind", "language"]
        constraints = [
            models.UniqueConstraint(fields=["edition", "kind", "language"], name="unique_template_per_language"),
        ]

    def __str__(self):
        return f"{self.get_kind_display()} · {self.edition.year} · {self.language.upper()}"


class EmailLog(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "В очереди"
        SENT = "sent", "Отправлено"
        FAILED = "failed", "Ошибка"

    created_at = models.DateTimeField("Создано", auto_now_add=True, db_index=True)
    sent_at = models.DateTimeField("Отправлено", null=True, blank=True)
    status = models.CharField("Статус", max_length=16, choices=Status.choices, default=Status.PENDING)
    to_email = models.EmailField("Получатель")
    subject = models.CharField("Тема", max_length=255)
    body_html = models.TextField("Текст")
    error = models.TextField("Ошибка", blank=True)
    registration = models.ForeignKey(
        "registrations.Registration",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="emails",
        verbose_name="Регистрация",
    )

    class Meta:
        verbose_name = "письмо"
        verbose_name_plural = "журнал отправки"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} → {self.to_email}"
