"""Notification repository — async CRUD operations."""

from typing import List

from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.notification import Notification


async def create_notification(db: AsyncSession, user_id: str, type: str,
                               message: str, reference_id: str = None,
                               reference_type: str = None) -> Notification:
    notif = Notification(user_id=user_id, type=type, message=message,
                         reference_id=reference_id, reference_type=reference_type)
    db.add(notif)
    await db.flush()
    return notif


async def get_for_user(db: AsyncSession, user_id: str,
                        page: int = 1, limit: int = 20) -> List[Notification]:
    offset = (page - 1) * limit
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .offset(offset).limit(limit)
    )
    return list(result.scalars().all())


async def mark_read(db: AsyncSession, notification_id: str) -> Notification | None:
    result = await db.execute(
        select(Notification).where(Notification.id == notification_id)
    )
    notif = result.scalar_one_or_none()
    if notif:
        notif.is_read = True
        await db.flush()
    return notif


async def mark_all_read(db: AsyncSession, user_id: str) -> int:
    result = await db.execute(
        select(Notification).where(
            Notification.user_id == user_id,
            Notification.is_read == False,
        )
    )
    notifs = result.scalars().all()
    for n in notifs:
        n.is_read = True
    await db.flush()
    return len(notifs)


async def get_unread_count(db: AsyncSession, user_id: str) -> int:
    result = await db.execute(
        select(func.count(Notification.id)).where(
            Notification.user_id == user_id,
            Notification.is_read == False,
        )
    )
    return result.scalar() or 0
