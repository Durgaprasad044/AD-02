"""Content ranker — rank posts by relevance."""

from typing import List

from agents.shared.config import CONTENT_RANK_LIMIT


async def rank_posts(user_id: str, user_embedding: List[float]) -> List[str]:
    """Rank posts by relevance to user. Returns sorted post IDs."""
    # Placeholder — in production, compare post embeddings to user embedding
    return []
