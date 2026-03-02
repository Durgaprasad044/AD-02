"""Availability cache — user online/offline status."""

from cache.redis_client import get_redis

DEFAULT_TTL = 300  # 5 minutes


async def set_availability(user_id: str, status: str, ttl: int = DEFAULT_TTL):
    redis = await get_redis()
    await redis.set(f"availability:{user_id}", status, ex=ttl)


async def get_availability(user_id: str) -> str | None:
    redis = await get_redis()
    return await redis.get(f"availability:{user_id}")
