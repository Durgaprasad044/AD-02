"""Pinecone vector store client."""

import logging
logger = logging.getLogger(__name__)

_index = None


def get_index():
    """Get Pinecone index. Returns None if not configured."""
    global _index
    if _index is not None:
        return _index

    try:
        from pinecone import Pinecone
        from config.settings import get_settings
        settings = get_settings()

        if not settings.PINECONE_API_KEY:
            logger.warning("Pinecone API key not set, vector store disabled")
            return None

        pc = Pinecone(api_key=settings.PINECONE_API_KEY)
        _index = pc.Index(settings.PINECONE_INDEX_NAME)
        return _index
    except Exception as e:
        logger.warning(f"Pinecone not available: {e}")
        return None
