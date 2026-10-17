from django.db import migrations, models


class Migration(migrations.Migration):
    """Paper fields without a length limit; old registrations have up to 3500 characters there."""

    dependencies = [("registrations", "0001_initial")]

    operations = [
        migrations.AlterField(
            model_name="registration",
            name="confchair_paper_id",
            field=models.TextField(blank=True, verbose_name="ID доклада в ConfChair"),
        ),
        migrations.AlterField(
            model_name="registration",
            name="paper_title",
            field=models.TextField(blank=True, verbose_name="Название доклада"),
        ),
    ]
