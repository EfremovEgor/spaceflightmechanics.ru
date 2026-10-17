from django.core.management.base import BaseCommand
from django.db import connection

from apps.editions.models import Edition
from apps.registrations.legacy import LEGACY_TABLES, import_legacy_registrations


class Command(BaseCommand):
    help = (
        "Copies registrations that arrived in the old Go tables after the migration "
        f"({', '.join(LEGACY_TABLES.values())}). Already imported rows are skipped."
    )

    def handle(self, *args, **options):
        if connection.vendor != "postgresql":
            self.stderr.write("Legacy tables exist only in PostgreSQL; nothing to do.")
            return
        result = import_legacy_registrations(connection, dict(Edition.objects.values_list("code", "id")))
        if not result:
            self.stdout.write("No legacy tables found.")
        for code, count in result.items():
            self.stdout.write(f"{code}: imported {count} new registrations")
