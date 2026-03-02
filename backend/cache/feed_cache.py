"""Feed cache — cached post feeds per user."""

import json
from cache.redis_client import get_redis

FEED_TTL = 300  # 5 minutes


async def cache_feed(user_id: str, posts: list, ttl: int = FEED_TTL):
    redis = await get_redis()
    await redis.set(f"feed:{user_id}", json.dumps(posts), ex=ttl)


async def get_cached_feed(user_id: str) -> list | None:
    redis = await get_redis()
    data = await redis.get(f"feed:{user_id}")
    if data:
        return json.loads(data)
    return None


async def invalidate_feed(user_id: str):
    redis = await get_redis()
    await redis.delete(f"feed:{user_id}")
