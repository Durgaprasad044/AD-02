"""Session cache — token blacklisting."""

from cache.redis_client import get_redis

SESSION_TTL = 86400  # 24 hours


async def store_session(token: str, user_id: str, ttl: int = SESSION_TTL):
    redis = await get_redis()
    await redis.set(f"session:{token}", user_id, ex=ttl)


async def get_session(token: str) -> str | None:
    redis = await get_redis()
    return await redis.get(f"session:{token}")


async def invalidate_session(token: str):
    redis = await get_redis()
    await redis.delete(f"session:{token}")
    # Add to blacklist
    await redis.set(f"blacklist:{token}", "1", ex=SESSION_TTL)


async def is_blacklisted(token: str) -> bool:
    redis = await get_redis()
    result = await redis.get(f"blacklist:{token}")
    return result is not None
