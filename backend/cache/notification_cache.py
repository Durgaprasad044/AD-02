"""Notification cache — unread counts."""

from cache.redis_client import get_redis


async def get_unread_count(user_id: str) -> int:
    redis = await get_redis()
    count = await redis.get(f"notif_count:{user_id}")
    return int(count) if count else 0


async def increment_unread(user_id: str):
    redis = await get_redis()
    await redis.incr(f"notif_count:{user_id}")


async def reset_unread(user_id: str):
    redis = await get_redis()
    await redis.set(f"notif_count:{user_id}", 0)
