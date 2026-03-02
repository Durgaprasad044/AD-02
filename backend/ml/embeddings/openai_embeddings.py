"""OpenAI embedding client."""

import logging
from typing import List

logger = logging.getLogger(__name__)


async def embed(text: str) -> List[float]:
    """Generate embedding using OpenAI API. Falls back to dummy."""
    try:
        from openai import AsyncOpenAI
        from config.settings import get_settings
        settings = get_settings()

        if not settings.OPENAI_API_KEY:
            raise ValueError("OpenAI API key not set")

        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        response = await client.embeddings.create(
            model="text-embedding-ada-002",
            input=text,
        )
        return response.data[0].embedding
    except Exception as e:
        logger.warning(f"OpenAI embedding failed, using fallback: {e}")
        import hashlib
        h = hashlib.sha256(text.encode()).hexdigest()
        return [int(h[i:i+2], 16) / 255.0 for i in range(0, 128, 2)]
