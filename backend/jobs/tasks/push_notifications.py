"""Celery task: push notifications via FCM."""

from jobs.celery_app import celery_app


@celery_app.task(name="jobs.tasks.push_notifications.send_push")
def send_push(device_token: str, title: str, body: str, data: dict = None):
    """Send push notification via Firebase Cloud Messaging."""
    print(f"Push task: {title} to {device_token} — placeholder")
