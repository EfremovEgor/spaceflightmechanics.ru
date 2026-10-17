import logging
import threading

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.core.mail.backends.smtp import EmailBackend
from django.db import close_old_connections, transaction
from django.template import Context, Template
from django.utils import timezone
from django.utils.html import strip_tags

from .models import EmailLog, EmailTemplate, SmtpSettings

logger = logging.getLogger(__name__)


class MailingError(Exception):
    pass


def smtp_connection(smtp: SmtpSettings):
    if settings.MAILING_USE_DJANGO_BACKEND:
        return get_connection()
    if not smtp.host:
        raise MailingError("SMTP-сервер не указан в настройках SMTP")
    return EmailBackend(
        host=smtp.host,
        port=smtp.port,
        username=smtp.username or None,
        password=smtp.password or None,
        use_ssl=smtp.security == SmtpSettings.Security.SSL,
        use_tls=smtp.security == SmtpSettings.Security.STARTTLS,
        timeout=smtp.timeout,
        fail_silently=False,
    )


def send_message(to_email: str, subject: str, body_html: str, smtp: SmtpSettings | None = None) -> None:
    """Sends one HTML email right away; raises on failure."""
    smtp = smtp or SmtpSettings.load()
    if not smtp.enabled and not settings.MAILING_USE_DJANGO_BACKEND:
        raise MailingError("Отправка писем выключена в настройках SMTP")
    message = EmailMultiAlternatives(
        subject=subject,
        body=strip_tags(body_html).strip(),
        from_email=smtp.sender or None,
        to=[to_email],
        reply_to=[smtp.reply_to] if smtp.reply_to else None,
        connection=smtp_connection(smtp),
    )
    message.attach_alternative(body_html, "text/html")
    message.send()


def render_template(template: EmailTemplate, registration) -> tuple[str, str]:
    edition = registration.edition
    context = Context(
        {
            "registration": registration,
            "edition": edition,
            "edition_title": edition.title(registration.language),
            "full_name": registration.full_name,
            "email": registration.email,
        }
    )
    subject = Template(template.subject).render(context).strip()
    body = Template(template.body_html).render(context)
    return subject, body


def confirmation_template(registration) -> EmailTemplate | None:
    templates = EmailTemplate.objects.filter(
        edition=registration.edition,
        kind=EmailTemplate.Kind.REGISTRATION_CONFIRMATION,
        is_active=True,
    )
    by_language = {t.language: t for t in templates}
    return by_language.get(registration.language) or by_language.get("en") or next(iter(by_language.values()), None)


def deliver(log_id: int) -> EmailLog:
    """Sends a queued log entry and records the outcome."""
    log = EmailLog.objects.get(pk=log_id)
    try:
        send_message(log.to_email, log.subject, log.body_html)
    except Exception as exc:  # SMTP errors of any kind end up in the log, never in the API response
        logger.warning("Email %s to %s failed: %s", log.pk, log.to_email, exc)
        log.status = EmailLog.Status.FAILED
        log.error = str(exc)[:2000]
    else:
        log.status = EmailLog.Status.SENT
        log.sent_at = timezone.now()
        log.error = ""
    log.save(update_fields=["status", "sent_at", "error"])
    return log


def _deliver_in_background(log_id: int) -> None:
    def run():
        try:
            deliver(log_id)
        finally:
            close_old_connections()

    if settings.MAILING_SYNC:
        deliver(log_id)
    else:
        threading.Thread(target=run, daemon=True, name=f"email-{log_id}").start()


def queue(log: EmailLog) -> EmailLog:
    """Sends after the current transaction commits, without blocking the request."""
    transaction.on_commit(lambda: _deliver_in_background(log.pk))
    return log


def send_registration_confirmation(registration) -> EmailLog | None:
    template = confirmation_template(registration)
    if template is None:
        logger.warning("No confirmation template for edition %s", registration.edition_id)
        return None
    subject, body = render_template(template, registration)
    log = EmailLog.objects.create(
        to_email=registration.email,
        subject=subject,
        body_html=body,
        registration=registration,
    )
    return queue(log)


def resend(log: EmailLog) -> EmailLog:
    log.status = EmailLog.Status.PENDING
    log.error = ""
    log.save(update_fields=["status", "error"])
    return queue(log)
