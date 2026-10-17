import datetime

from django.contrib.auth.models import User
from django.test import TestCase, override_settings
from django.urls import reverse

from apps.mailing.models import EmailTemplate
from apps.registrations.models import Registration

from .models import Edition


class EditionTests(TestCase):
    def test_seeded_years(self):
        self.assertEqual(list(Edition.objects.values_list("slug", flat=True)), ["scitech-2026", "scitech-2025"])
        self.assertEqual(Edition.current().slug, "scitech-2026")

    def test_only_one_current_edition(self):
        old = Edition.objects.get(slug="scitech-2025")
        old.is_current = True
        old.save()
        self.assertEqual(list(Edition.objects.filter(is_current=True)), [old])

    def test_registration_closes_by_date(self):
        edition = Edition.current()
        edition.registration_closes_at = datetime.datetime(2026, 1, 1, tzinfo=datetime.UTC)
        self.assertFalse(edition.accepts_registrations(now=datetime.datetime(2026, 2, 1, tzinfo=datetime.UTC)))
        self.assertTrue(edition.accepts_registrations(now=datetime.datetime(2025, 12, 1, tzinfo=datetime.UTC)))

    def test_public_list(self):
        data = self.client.get("/api/v1/editions/").json()
        self.assertEqual([e["slug"] for e in data], ["scitech-2026", "scitech-2025"])
        self.assertEqual(data[1]["site_path"], "/previous/scitech-2025/")
        self.assertFalse(data[1]["registration_open"])


@override_settings(MAILING_USE_DJANGO_BACKEND=True, MAILING_SYNC=True)
class AdminTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser("admin", "admin@example.com", "pass")
        self.client.force_login(self.admin)
        edition = Edition.current()
        Registration.objects.create(
            edition=edition,
            full_name="Ivan Petrov",
            email="ivan@example.com",
            country="Russian Federation",
            organization="RUDN University",
            participation_format="offline",
        )

    def test_pages_render(self):
        for name, args in [
            ("admin:index", []),
            ("admin:registrations_registration_changelist", []),
            ("admin:registrations_registration_change", [Registration.objects.get().pk]),
            ("admin:editions_edition_changelist", []),
            ("admin:editions_edition_change", [Edition.current().pk]),
            ("admin:mailing_emailtemplate_changelist", []),
            ("admin:mailing_emailtemplate_change", [EmailTemplate.objects.first().pk]),
            ("admin:mailing_emaillog_changelist", []),
            ("admin:auth_user_changelist", []),
        ]:
            with self.subTest(name=name):
                response = self.client.get(reverse(name, args=args))
                self.assertEqual(response.status_code, 200)

    def test_registrations_filters_and_search(self):
        url = reverse("admin:registrations_registration_changelist")
        response = self.client.get(url, {"q": "petrov", "participation_format__exact": "offline", "country": "Russian Federation"})
        self.assertContains(response, "Ivan Petrov")

    def test_export_to_excel(self):
        url = reverse("admin:registrations_registration_export")
        response = self.client.post(
            url,
            {"format": "1", "resource": "0", **{f"registrationresource_{f}": "on" for f in ["full_name", "email", "edition"]}},
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("spreadsheetml", response["Content-Type"])

    def test_smtp_settings_is_a_single_page(self):
        response = self.client.get(reverse("admin:mailing_smtpsettings_changelist"))
        self.assertRedirects(response, reverse("admin:mailing_smtpsettings_change", args=[1]))

    def test_create_next_year(self):
        current = Edition.current()
        url = reverse("admin:editions_edition_create_next_edition", args=[current.pk])
        response = self.client.get(url)
        new = Edition.objects.get(slug="scitech-2027")
        self.assertRedirects(response, reverse("admin:editions_edition_change", args=[new.pk]))
        self.assertEqual((new.number, new.code, new.start_date), (8, "scitech2027", datetime.date(2027, 11, 24)))
        self.assertEqual(new.title_en, "8th SciTech Forum on Space Engineering and Operations Support")
        self.assertFalse(new.is_current or new.registration_open)
        self.assertEqual(
            sorted(new.email_templates.values_list("language", "subject")),
            [("en", "Registration for the 8th SciTech Forum"), ("ru", "Регистрация на 8th SciTech Forum")],
        )
