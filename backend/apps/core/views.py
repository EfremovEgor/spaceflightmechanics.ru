from django.db import connection
from django.http import JsonResponse


def health(request):
    """Liveness probe: the process is up and the database answers."""
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
    return JsonResponse({"status": "ok"})
