"""Embeddings store — upsert/delete vectors."""

import logging
from typing import Dict, List, Optional

from vector_store.pinecone_client import get_index

logger = logging.getLogger(__name__)

# In-memory fallback
_memory_store: Dict[str, dict] = {}


async def upsert_embedding(user_id: str, vector: List[float],
                            metadata: Optional[dict] = None):
    """Upsert a user embedding vector."""
    index = get_index()
    if index:
        try:
            index.upsert(vectors=[(user_id, vector, metadata or {})])
            return
        except Exception as e:
            logger.warning(f"Pinecone upsert failed, using memory: {e}")

    _memory_store[user_id] = {"vector": vector, "metadata": metadata or {}}


async def delete_embedding(user_id: str):
    """Delete a user embedding."""
    index = get_index()
    if index:
        try:
            index.delete(ids=[user_id])
            return
        except Exception as e:
            logger.warning(f"Pinecone delete failed: {e}")

    _memory_store.pop(user_id, None)


def get_all_embeddings() -> Dict[str, dict]:
    """Get all stored embeddings (memory fallback only)."""
    return _memory_store
