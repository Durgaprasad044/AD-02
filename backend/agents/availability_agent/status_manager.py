"""Status manager — availability state in cache."""

from cache.availability_cache import set_availability, get_availability

DEFAULT_TTL = 300


async def set_status(user_id: str, status: str):
    await set_availability(user_id, status, ttl=DEFAULT_TTL)


async def get_status(user_id: str) -> str:
    result = await get_availability(user_id)
    return result or "offline"
