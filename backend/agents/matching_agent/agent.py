"""Matching agent — orchestrates the matching pipeline."""

import logging
from typing import List

from agents.matching_agent.scoring import compute_final_scores
from agents.matching_agent.similarity import batch_cosine_similarity
from vector_store.similarity_search import search_similar
from agents.shared.config import MAX_MATCHES_PER_USER

logger = logging.getLogger(__name__)


async def run(user_id: str, user_embedding: List[float],
              user_profile: dict = None) -> List[dict]:
    """
    Given user_id and embedding, find and rank top match candidates.
    Returns: [{ user_id, compatibility_score }, ...]
    """
    # Query vector store for similar users
    candidates = await search_similar(
        vector=user_embedding,
        top_k=MAX_MATCHES_PER_USER * 2,
    )

    # Filter out self
    candidates = [c for c in candidates if c["id"] != user_id]

    # Compute final scores with additional signals
    scored = compute_final_scores(candidates, user_profile or {})

    # Return top N
    return scored[:MAX_MATCHES_PER_USER]
