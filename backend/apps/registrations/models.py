import uuid

from django.db import models
from django.db.models.functions import Lower
from django.utils import timezone

from apps.editions.models import Edition


class Registration(models.Model):
    class Format(models.TextChoices):
        ONLINE = "online", "Онлайн"
        OFFLINE = "offline", "Очно"

    class Language(models.TextChoices):
        EN = "en", "English"
        RU = "ru", "Русский"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    edition = models.ForeignKey(Edition, on_delete=models.PROTECT, related_name="registrations", verbose_name="Форум")
    full_name = models.CharField("Имя и фамилия", max_length=255)
    email = models.EmailField("Email", max_length=254)
    country = models.CharField("Страна", max_length=128)
    organization = models.CharField("Организация", max_length=255)
    participation_format = models.CharField("Формат участия", max_length=16, choices=Format.choices)
    full_name_ru = models.CharField("ФИО на русском", max_length=255, blank=True)
    is_presenter = models.BooleanField("С докладом", default=False)
    confchair_paper_id = models.CharField("ID доклада в ConfChair", max_length=64, blank=True)
    paper_title = models.CharField("Название доклада", max_length=500, blank=True)
    language = models.CharField(
        "Язык сайта",
        max_length=2,
        choices=Language.choices,
        default=Language.EN,
        help_text="На этом языке отправлено письмо-подтверждение.",
    )
    created_at = models.DateTimeField("Зарегистрирован", default=timezone.now, db_index=True)

    class Meta:
        verbose_name = "регистрация"
        verbose_name_plural = "регистрации"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(Lower("email"), "edition", name="unique_email_per_edition"),
        ]

    def __str__(self):
        return f"{self.full_name} <{self.email}>"
