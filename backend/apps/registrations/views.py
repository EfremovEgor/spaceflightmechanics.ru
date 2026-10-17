import logging

from django.db import IntegrityError, transaction
from django.shortcuts import get_object_or_404
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from apps.core.responses import error, success
from apps.editions.models import Edition
from apps.mailing.services import send_registration_confirmation

from .models import Registration
from .serializers import RegistrationSerializer

logger = logging.getLogger(__name__)


class RegisterView(APIView):
    """
    POST /api/<code>/register        (code such as scitech2026, used by the existing sites)
    POST /api/v1/editions/<slug>/register/
    """

    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "registration"

    def post(self, request, code=None, slug=None):
        lookup = {"code": code} if code else {"slug": slug}
        edition = get_object_or_404(Edition, **lookup)
        if not edition.accepts_registrations():
            return error("Registration is closed", status=403)

        serializer = RegistrationSerializer(data=request.data)
        if not serializer.is_valid():
            return error("Invalid input", status=400, errors=serializer.errors)

        email = serializer.validated_data["email"]
        if Registration.objects.filter(edition=edition, email__iexact=email).exists():
            return error("This email is already registered", status=409)

        try:
            with transaction.atomic():
                registration = serializer.save(edition=edition)
                send_registration_confirmation(registration)
        except IntegrityError:
            # Two submissions of the same email at once; anything else is a real error.
            if Registration.objects.filter(edition=edition, email__iexact=email).exists():
                return error("This email is already registered", status=409)
            raise

        logger.info("Registration %s for %s", registration.pk, edition.slug)
        return success(RegistrationSerializer(registration).data, status=201)
