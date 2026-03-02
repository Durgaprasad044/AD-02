"""Recommendation agent — content and user recommendations."""

import logging
from typing import List

from agents.recommendation_agent.content_ranker import rank_posts
from agents.recommendation_agent.user_discovery import discover_users

logger = logging.getLogger(__name__)


async def run(user_id: str, user_embedding: List[float] = None) -> dict:
    """Orchestrate content and user recommendations."""
    posts = await rank_posts(user_id, user_embedding or [])
    people = await discover_users(user_id, user_embedding or [])
    return {"recommended_posts": posts, "suggested_people": people}
