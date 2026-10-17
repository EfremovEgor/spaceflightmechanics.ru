from django.contrib.auth.models import User
from django.core import mail
from django.db import connection
from django.test import TestCase, override_settings
from django.urls import reverse

from .models import EmailLog, SmtpSettings


class SmtpSettingsTests(TestCase):
    @override_settings(SMTP_DEFAULTS={"host": "smtp.example.com", "port": 587, "username": "u", "password": "p", "from_email": "orgcom@example.com"})
    def test_first_load_takes_values_from_environment(self):
        smtp = SmtpSettings.load()
        self.assertEqual((smtp.host, smtp.port, smtp.security), ("smtp.example.com", 587, SmtpSettings.Security.STARTTLS))
        self.assertEqual(smtp.password, "p")

    def test_password_is_encrypted_at_rest(self):
        smtp = SmtpSettings.load()
        smtp.password = "s3cret-value"
        smtp.save()
        with connection.cursor() as cursor:
            cursor.execute("SELECT password FROM mailing_smtpsettings WHERE id = 1")
            raw = cursor.fetchone()[0]
        self.assertNotIn("s3cret", raw)
        self.assertEqual(SmtpSettings.load().password, "s3cret-value")

    def test_blank_password_in_admin_keeps_the_saved_one(self):
        smtp = SmtpSettings.load()
        smtp.password = "keep-me"
        smtp.save()
        admin = User.objects.create_superuser("admin", "admin@example.com", "pass")
        self.client.force_login(admin)
        url = reverse("admin:mailing_smtpsettings_change", args=[1])
        self.client.post(
            url,
            {
                "enabled": "on",
                "host": "smtp.example.com",
                "port": "465",
                "security": "ssl",
                "timeout": "20",
                "username": "orgcom@example.com",
                "password": "",
                "from_name": "SciTech Forum",
                "from_email": "orgcom@example.com",
                "reply_to": "",
            },
        )
        smtp = SmtpSettings.load()
        self.assertEqual((smtp.host, smtp.password), ("smtp.example.com", "keep-me"))

    @override_settings(MAILING_USE_DJANGO_BACKEND=True)
    def test_send_test_email_button(self):
        admin = User.objects.create_superuser("admin", "admin@example.com", "pass")
        self.client.force_login(admin)
        SmtpSettings.load()
        response = self.client.get(reverse("admin:mailing_smtpsettings_send_test_email", args=[1]))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(mail.outbox[0].to, ["admin@example.com"])

    @override_settings(MAILING_USE_DJANGO_BACKEND=True, MAILING_SYNC=True)
    def test_resend_from_log(self):
        admin = User.objects.create_superuser("admin", "admin@example.com", "pass")
        self.client.force_login(admin)
        log = EmailLog.objects.create(to_email="a@example.com", subject="S", body_html="<p>B</p>", status=EmailLog.Status.FAILED)
        with self.captureOnCommitCallbacks(execute=True):
            self.client.post(
                reverse("admin:mailing_emaillog_changelist"),
                {"action": "resend_selected", "_selected_action": [log.pk]},
            )
        log.refresh_from_db()
        self.assertEqual(log.status, EmailLog.Status.SENT)
        self.assertEqual(len(mail.outbox), 1)
