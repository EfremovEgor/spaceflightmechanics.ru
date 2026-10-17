"""Copies registrations from the tables of the previous Go service (one table per year)."""

LEGACY_TABLES = {
    "scitech2025": "scitech_2025_registration",
    "scitech2026": "scitech_2026_registration",
}


def import_legacy_registrations(connection, edition_ids: dict[str, int]) -> dict[str, int]:
    """
    Inserts rows that are not imported yet, keeping their ids and dates; returns the number
    of new rows per edition code. Safe to run repeatedly. PostgreSQL only.
    """
    if connection.vendor != "postgresql":
        return {}
    existing = set(connection.introspection.table_names())
    imported = {}
    with connection.cursor() as cursor:
        for code, table in LEGACY_TABLES.items():
            if table not in existing or code not in edition_ids:
                continue
            cursor.execute(
                f"""
                INSERT INTO registrations_registration (
                    id, edition_id, full_name, email, country, organization, participation_format,
                    full_name_ru, is_presenter, confchair_paper_id, paper_title, language, created_at
                )
                SELECT
                    id, %s, full_name, TRIM(email), COALESCE(country, ''), COALESCE(organization, ''),
                    COALESCE(participation_format, ''), COALESCE(full_name_ru, ''), COALESCE(is_presenter, FALSE),
                    COALESCE(confchair_paper_id, ''), COALESCE(paper_title, ''), 'en', COALESCE(created_at, NOW())
                FROM {table}
                ON CONFLICT DO NOTHING
                """,
                [edition_ids[code]],
            )
            imported[code] = cursor.rowcount
    return imported
