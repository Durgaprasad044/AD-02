"""Profile repository — async CRUD operations."""

from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.profile import Profile


async def create_profile(db: AsyncSession, user_id: str, **kwargs) -> Profile:
    profile = Profile(user_id=user_id, **kwargs)
    db.add(profile)
    await db.flush()
    return profile


async def get_by_user_id(db: AsyncSession, user_id: str) -> Profile | None:
    result = await db.execute(select(Profile).where(Profile.user_id == user_id))
    return result.scalar_one_or_none()


async def update_profile(db: AsyncSession, user_id: str, **kwargs) -> Profile | None:
    profile = await get_by_user_id(db, user_id)
    if profile:
        for key, value in kwargs.items():
            if value is not None and hasattr(profile, key):
                setattr(profile, key, value)
        await db.flush()
    return profile


async def get_profiles_by_ids(db: AsyncSession, user_ids: List[str]) -> List[Profile]:
    result = await db.execute(select(Profile).where(Profile.user_id.in_(user_ids)))
    return list(result.scalars().all())
