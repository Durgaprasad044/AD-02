"""SentenceBERT embedding model."""

import logging
from typing import List

logger = logging.getLogger(__name__)

_model = None


def _get_model():
    global _model
    if _model is not None:
        return _model
    try:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer("all-MiniLM-L6-v2")
        logger.info("Loaded SentenceBERT model")
        return _model
    except Exception as e:
        logger.warning(f"SentenceBERT not available: {e}")
        return None


def encode(text: str) -> List[float]:
    """Encode text to embedding vector. Returns zeros if model unavailable."""
    model = _get_model()
    if model:
        embedding = model.encode(text)
        return embedding.tolist()
    # Fallback: return dummy embedding
    import hashlib
    h = hashlib.sha256(text.encode()).hexdigest()
    return [int(h[i:i+2], 16) / 255.0 for i in range(0, 128, 2)]
