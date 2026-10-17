from django.core import mail
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from apps.editions.models import Edition
from apps.mailing.models import EmailLog, SmtpSettings

from .models import Registration

PAYLOAD = {
    "full_name": "Ivan Petrov",
    "email": "Ivan.Petrov@example.com",
    "country": "Russian Federation",
    "organization": "RUDN University",
    "participation_format": "offline",
    "full_name_ru": None,
    "is_presenter": True,
    "confchair_paper_id": "SCI-42",
    "paper_title": "Low-thrust transfers",
}


@override_settings(MAILING_USE_DJANGO_BACKEND=True, MAILING_SYNC=True)
class RegisterApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.edition = Edition.objects.get(slug="scitech-2026")

    def post(self, url="/api/scitech2026/register", **overrides):
        with self.captureOnCommitCallbacks(execute=True):
            return self.client.post(url, {**PAYLOAD, **overrides}, format="json")

    def test_registers_through_the_endpoint_of_the_existing_site(self):
        response = self.post()
        self.assertEqual(response.status_code, 201)
        body = response.json()
        self.assertTrue(body["success"])
        self.assertEqual(body["data"]["email"], "Ivan.Petrov@example.com")
        registration = Registration.objects.get()
        self.assertEqual(registration.edition, self.edition)
        self.assertEqual(registration.full_name_ru, "")
        self.assertEqual(registration.language, "en")

    def test_sends_confirmation_in_the_language_of_the_site(self):
        self.post(language="ru")
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, "Регистрация на 7th SciTech Forum")
        self.assertIn("Ivan Petrov", mail.outbox[0].alternatives[0][0])
        self.assertEqual(EmailLog.objects.get().status, EmailLog.Status.SENT)

    def test_english_confirmation_by_default(self):
        self.post()
        self.assertEqual(mail.outbox[0].subject, "Registration for the 7th SciTech Forum")
        self.assertEqual(mail.outbox[0].to, ["Ivan.Petrov@example.com"])

    def test_same_email_twice_is_a_conflict_regardless_of_case(self):
        self.post()
        response = self.post(email="ivan.petrov@EXAMPLE.com ")
        self.assertEqual(response.status_code, 409)
        self.assertEqual(Registration.objects.count(), 1)

    def test_same_email_can_register_for_another_year(self):
        self.post()
        Edition.objects.filter(slug="scitech-2025").update(registration_open=True)
        response = self.post(url="/api/scitech2025/register")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Registration.objects.count(), 2)

    def test_closed_registration_is_refused(self):
        response = self.post(url="/api/scitech2025/register")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json()["message"], "Registration is closed")

    def test_invalid_input(self):
        response = self.post(email="not-an-email", full_name="")
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json()["errors"])

    def test_presenter_needs_a_paper_title(self):
        response = self.post(paper_title="  ")
        self.assertEqual(response.status_code, 400)

    def test_paper_fields_are_dropped_for_listeners(self):
        self.post(is_presenter=False)
        registration = Registration.objects.get()
        self.assertEqual((registration.paper_title, registration.confchair_paper_id), ("", ""))

    def test_v1_endpoint_by_slug(self):
        response = self.post(url="/api/v1/editions/scitech-2026/register/")
        self.assertEqual(response.status_code, 201)

    def test_unknown_edition(self):
        response = self.post(url="/api/scitech1999/register")
        self.assertEqual(response.status_code, 404)

    @override_settings(MAILING_USE_DJANGO_BACKEND=False)
    def test_smtp_failure_is_logged_and_registration_kept(self):
        SmtpSettings.objects.update_or_create(pk=1, defaults={"host": ""})
        response = self.post()
        self.assertEqual(response.status_code, 201)
        log = EmailLog.objects.get()
        self.assertEqual(log.status, EmailLog.Status.FAILED)
        self.assertIn("SMTP", log.error)
