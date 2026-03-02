"""Match repository — async CRUD operations."""

from typing import List

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.match import Match


async def create_match(db: AsyncSession, user_id_1: str, user_id_2: str,
                       compatibility_score: float = 0.0) -> Match:
    match = Match(user_id_1=user_id_1, user_id_2=user_id_2,
                  compatibility_score=compatibility_score)
    db.add(match)
    await db.flush()
    return match


async def get_matches_for_user(db: AsyncSession, user_id: str,
                                status: str = None) -> List[Match]:
    query = select(Match).where(
        or_(Match.user_id_1 == user_id, Match.user_id_2 == user_id)
    )
    if status:
        query = query.where(Match.status == status)
    query = query.order_by(Match.compatibility_score.desc())
    result = await db.execute(query)
    return list(result.scalars().all())


async def update_match_status(db: AsyncSession, match_id: str, status: str) -> Match | None:
    result = await db.execute(select(Match).where(Match.id == match_id))
    match = result.scalar_one_or_none()
    if match:
        match.status = status
        await db.flush()
    return match


async def get_match_by_user_pair(db: AsyncSession, user_id_1: str,
                                  user_id_2: str) -> Match | None:
    result = await db.execute(
        select(Match).where(
            or_(
                (Match.user_id_1 == user_id_1) & (Match.user_id_2 == user_id_2),
                (Match.user_id_1 == user_id_2) & (Match.user_id_2 == user_id_1),
            )
        )
    )
    return result.scalar_one_or_none()
