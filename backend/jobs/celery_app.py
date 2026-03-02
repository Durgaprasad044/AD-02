"""Celery app configuration."""

from celery import Celery

from config.settings import get_settings

settings = get_settings()

celery_app = Celery(
    "atrius",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_BROKER_URL,
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    beat_schedule={
        "refresh-matches-daily": {
            "task": "jobs.tasks.match_refresh.refresh_matches",
            "schedule": 86400.0,  # daily
        },
    },
)

celery_app.autodiscover_tasks(["jobs.tasks"])
