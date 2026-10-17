from django.db import migrations

WRAP = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#111">{}</div>'

# Texts of the confirmation emails the Go service sent, plus a Russian version for 2026.
TEMPLATES = [
    (
        "scitech-2025",
        "en",
        "Registration for the 6th SciTech Forum",
        "<p>Dear {{ full_name }},</p>"
        "<p>You have successfully registered to the 6th SciTech Forum on Space Engineering and Operations Support. "
        "If you join online, please find the Zoom link below:<br>"
        "https://us06web.zoom.us/meeting/register/a7NZ3jCgQRyI1N-wdhPFIA</p>"
        "<p>Best Regards,<br>Local Organizing Committee</p>",
    ),
    (
        "scitech-2026",
        "en",
        "Registration for the 7th SciTech Forum",
        "<p>Dear {{ full_name }},</p>"
        "<p>You have successfully registered to the 7th SciTech Forum on Space Engineering and Operations Support "
        "(November 24-26, 2026, RUDN University, Moscow). If you join online, the Zoom link will be sent to you "
        "before the Forum.</p>"
        "<p>Best Regards,<br>Local Organizing Committee</p>",
    ),
    (
        "scitech-2026",
        "ru",
        "Регистрация на 7th SciTech Forum",
        "<p>Здравствуйте, {{ full_name }}!</p>"
        "<p>Вы успешно зарегистрировались на 7th SciTech Forum on Space Engineering and Operations Support "
        "(24–26 ноября 2026 г., РУДН, Москва). Если вы участвуете онлайн, ссылка на Zoom придёт перед форумом.</p>"
        "<p>С уважением,<br>Местный организационный комитет</p>",
    ),
]


def seed(apps, schema_editor):
    Edition = apps.get_model("editions", "Edition")
    EmailTemplate = apps.get_model("mailing", "EmailTemplate")
    for slug, language, subject, body in TEMPLATES:
        edition = Edition.objects.filter(slug=slug).first()
        if edition:
            EmailTemplate.objects.get_or_create(
                edition=edition,
                kind="registration_confirmation",
                language=language,
                defaults={"subject": subject, "body_html": WRAP.format(body)},
            )


class Migration(migrations.Migration):
    dependencies = [
        ("mailing", "0001_initial"),
        ("editions", "0002_seed_editions"),
    ]

    operations = [migrations.RunPython(seed, migrations.RunPython.noop)]
