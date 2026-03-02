"""Celery task: refresh match candidates."""

from jobs.celery_app import celery_app


@celery_app.task(name="jobs.tasks.match_refresh.refresh_matches")
def refresh_matches():
    """Periodic task: refresh match candidates for active users."""
    print("Match refresh task executed — placeholder for now")
