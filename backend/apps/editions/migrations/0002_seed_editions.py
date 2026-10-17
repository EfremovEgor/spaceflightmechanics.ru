import datetime

from django.db import migrations

EDITIONS = [
    {
        "slug": "scitech-2025",
        "code": "scitech2025",
        "number": 6,
        "year": 2025,
        "title_en": "6th SciTech Forum on Space Engineering and Operations Support",
        "start_date": datetime.date(2025, 12, 2),
        "end_date": datetime.date(2025, 12, 4),
        "site_path": "/previous/scitech-2025/",
        "is_current": False,
        "registration_open": False,
    },
    {
        "slug": "scitech-2026",
        "code": "scitech2026",
        "number": 7,
        "year": 2026,
        "title_en": "7th SciTech Forum on Space Engineering and Operations Support",
        "start_date": datetime.date(2026, 11, 24),
        "end_date": datetime.date(2026, 11, 26),
        "site_path": "/",
        "is_current": True,
        "registration_open": True,
    },
]


def seed(apps, schema_editor):
    Edition = apps.get_model("editions", "Edition")
    for data in EDITIONS:
        Edition.objects.get_or_create(slug=data["slug"], defaults=data)


class Migration(migrations.Migration):
    dependencies = [("editions", "0001_initial")]

    operations = [migrations.RunPython(seed, migrations.RunPython.noop)]
