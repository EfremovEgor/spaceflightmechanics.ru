from unfold.admin import ModelAdmin


class SectionTitleAdmin(ModelAdmin):
    """Changelist titled with the plural name ("Регистрации") instead of Django's
    "Выберите <name> для изменения", which reads wrong in Russian."""

    def changelist_view(self, request, extra_context=None):
        title = str(self.model._meta.verbose_name_plural).capitalize()
        return super().changelist_view(request, {"title": title, **(extra_context or {})})
