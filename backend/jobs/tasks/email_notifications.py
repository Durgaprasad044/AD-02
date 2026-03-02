"""Celery task: send transactional emails."""

from jobs.celery_app import celery_app


@celery_app.task(name="jobs.tasks.email_notifications.send_email")
def send_email(template_id: str, recipient: str, context: dict):
    """Send transactional email via SendGrid or SMTP."""
    print(f"Email task: {template_id} to {recipient} — placeholder")
