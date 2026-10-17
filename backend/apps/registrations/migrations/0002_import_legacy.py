from django.db import migrations

from apps.registrations.legacy import import_legacy_registrations


def forwards(apps, schema_editor):
    Edition = apps.get_model("editions", "Edition")
    edition_ids = dict(Edition.objects.values_list("code", "id"))
    import_legacy_registrations(schema_editor.connection, edition_ids)


class Migration(migrations.Migration):
    dependencies = [
        ("registrations", "0001_initial"),
        ("editions", "0002_seed_editions"),
    ]

    operations = [migrations.RunPython(forwards, migrations.RunPython.noop)]
