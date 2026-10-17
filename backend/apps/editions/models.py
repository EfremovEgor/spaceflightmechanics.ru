from django.db import models, transaction
from django.db.models import Q
from django.utils import timezone


class Edition(models.Model):
    """One forum year. Each year has its own site and its own registrations."""

    slug = models.SlugField(
        "Слаг",
        unique=True,
        help_text="Например scitech-2026. Архив сайта открывается по адресу /previous/<слаг>/.",
    )
    code = models.SlugField(
        "Код в API",
        max_length=32,
        unique=True,
        help_text="Адрес регистрации /api/<код>/register, например scitech2026. Только латиница и цифры.",
    )
    number = models.PositiveSmallIntegerField("Номер форума", help_text="7 для 7th SciTech Forum.")
    year = models.PositiveSmallIntegerField("Год")
    title_en = models.CharField("Название (EN)", max_length=255)
    title_ru = models.CharField(
        "Название (RU)",
        max_length=255,
        blank=True,
        help_text="Если пусто, используется английское название.",
    )
    start_date = models.DateField("Начало")
    end_date = models.DateField("Окончание")
    venue_en = models.CharField("Место проведения (EN)", max_length=255, default="RUDN University, Moscow, Russia")
    venue_ru = models.CharField("Место проведения (RU)", max_length=255, blank=True, default="РУДН, Москва, Россия")
    site_path = models.CharField(
        "Путь сайта",
        max_length=128,
        default="/",
        help_text="«/» для текущего форума, «/previous/scitech-2025/» для архивного.",
    )
    is_current = models.BooleanField(
        "Текущий форум",
        default=False,
        help_text="Только один форум может быть текущим; отметка снимается с остальных автоматически.",
    )
    registration_open = models.BooleanField("Регистрация открыта", default=True)
    registration_closes_at = models.DateTimeField(
        "Регистрация закрывается",
        null=True,
        blank=True,
        help_text="Необязательно. После этого момента регистрация закроется сама.",
    )
    created_at = models.DateTimeField("Создан", auto_now_add=True)
    updated_at = models.DateTimeField("Изменён", auto_now=True)

    class Meta:
        verbose_name = "форум"
        verbose_name_plural = "форумы по годам"
        ordering = ["-year", "-number"]
        constraints = [
            models.UniqueConstraint(fields=["is_current"], condition=Q(is_current=True), name="single_current_edition"),
            models.CheckConstraint(condition=Q(end_date__gte=models.F("start_date")), name="edition_dates_ordered"),
        ]

    def __str__(self):
        return f"{self.title_en} ({self.year})"

    def title(self, language: str = "en") -> str:
        return (self.title_ru if language == "ru" else "") or self.title_en

    def venue(self, language: str = "en") -> str:
        return (self.venue_ru if language == "ru" else "") or self.venue_en

    def accepts_registrations(self, now=None) -> bool:
        now = now or timezone.now()
        return self.registration_open and (self.registration_closes_at is None or now < self.registration_closes_at)

    accepts_registrations.boolean = True

    def save(self, *args, **kwargs):
        with transaction.atomic():
            if self.is_current:
                Edition.objects.filter(is_current=True).exclude(pk=self.pk).update(is_current=False)
            super().save(*args, **kwargs)

    @classmethod
    def current(cls):
        return cls.objects.filter(is_current=True).first()
