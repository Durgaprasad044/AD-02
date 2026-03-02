"""User discovery — suggest new connections."""

from typing import List

from vector_store.similarity_search import search_similar
from agents.shared.config import MAX_RECOMMENDATIONS


async def discover_users(user_id: str, user_embedding: List[float]) -> List[dict]:
    """Suggest new users based on embedding similarity."""
    if not user_embedding:
        return []

    results = await search_similar(vector=user_embedding, top_k=MAX_RECOMMENDATIONS + 5)
    # Filter out self
    return [r for r in results if r["id"] != user_id][:MAX_RECOMMENDATIONS]
