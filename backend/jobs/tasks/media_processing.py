"""Celery task: media processing (resize/compress)."""

from jobs.celery_app import celery_app


@celery_app.task(name="jobs.tasks.media_processing.process_media")
def process_media(media_id: str):
    """Resize and compress uploaded images."""
    print(f"Media processing task for {media_id} — placeholder")
