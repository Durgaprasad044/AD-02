"""Redis connection pool and client."""

import logging

logger = logging.getLogger(__name__)

# In-memory fallback when Redis is not available
_memory_store: dict = {}


class MemoryRedis:
    """In-memory Redis-like fallback for development."""

    async def get(self, key: str):
        return _memory_store.get(key)

    async def set(self, key: str, value, ex: int = None):
        _memory_store[key] = value

    async def delete(self, key: str):
        _memory_store.pop(key, None)

    async def incr(self, key: str):
        _memory_store[key] = _memory_store.get(key, 0) + 1
        return _memory_store[key]

    async def close(self):
        pass


_redis_client = None


async def get_redis():
    """Get Redis client. Falls back to in-memory store."""
    global _redis_client
    if _redis_client is not None:
        return _redis_client

    try:
        import redis.asyncio as aioredis
        from config.settings import get_settings
        settings = get_settings()
        _redis_client = aioredis.from_url(settings.REDIS_URL, decode_responses=True)
        await _redis_client.ping()
        logger.info("Connected to Redis")
        return _redis_client
    except Exception as e:
        logger.warning(f"Redis not available, using in-memory fallback: {e}")
        _redis_client = MemoryRedis()
        return _redis_client
