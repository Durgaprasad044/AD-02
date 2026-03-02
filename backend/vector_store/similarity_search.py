"""Similarity search — query vector store for matches."""

import logging
from typing import Dict, List, Optional

from vector_store.pinecone_client import get_index
from vector_store.embeddings_store import get_all_embeddings
from ml.ranking.scoring_functions import cosine_similarity

logger = logging.getLogger(__name__)


async def search_similar(vector: List[float], top_k: int = 10,
                          filter: Optional[dict] = None) -> List[Dict]:
    """
    Search for similar vectors. Returns list of {id, score}.
    Falls back to in-memory brute force if Pinecone unavailable.
    """
    index = get_index()
    if index:
        try:
            results = index.query(vector=vector, top_k=top_k,
                                   filter=filter, include_metadata=True)
            return [{"id": m.id, "score": m.score} for m in results.matches]
        except Exception as e:
            logger.warning(f"Pinecone search failed, using memory fallback: {e}")

    # In-memory fallback
    embeddings = get_all_embeddings()
    scores = []
    for uid, data in embeddings.items():
        score = cosine_similarity(vector, data["vector"])
        scores.append({"id": uid, "score": score})

    scores.sort(key=lambda x: x["score"], reverse=True)
    return scores[:top_k]
