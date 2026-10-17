from rest_framework.response import Response


def success(data, status=200):
    """Response envelope of the previous Go API: {"success", "message", "data"}."""
    return Response({"success": True, "message": "Success", "data": data}, status=status)


def error(message, status, errors=None):
    body = {"success": False, "message": message}
    if errors:
        body["errors"] = errors
    return Response(body, status=status)
