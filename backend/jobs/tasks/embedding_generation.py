"""Celery task: batch embedding generation."""

from jobs.celery_app import celery_app


@celery_app.task(name="jobs.tasks.embedding_generation.generate_embeddings")
def generate_embeddings(user_ids: list):
    """Generate embeddings in batch for given user IDs."""
    import asyncio
    from agents.profile_agent.agent import run

    async def _run():
        for uid in user_ids:
            try:
                await run(uid, {})
            except Exception as e:
                print(f"Embedding failed for {uid}: {e}")

    asyncio.run(_run())
