"""Event repository — async CRUD operations."""

from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.event import Event


async def create_event(db: AsyncSession, creator_id: str, **kwargs) -> Event:
    event = Event(creator_id=creator_id, **kwargs)
    db.add(event)
    await db.flush()
    return event


async def get_events(db: AsyncSession, page: int = 1, limit: int = 20) -> List[Event]:
    offset = (page - 1) * limit
    result = await db.execute(
        select(Event).order_by(Event.event_date.asc()).offset(offset).limit(limit)
    )
    return list(result.scalars().all())


async def get_by_id(db: AsyncSession, event_id: str) -> Event | None:
    result = await db.execute(select(Event).where(Event.id == event_id))
    return result.scalar_one_or_none()


async def update_attendee_count(db: AsyncSession, event_id: str, delta: int) -> Event | None:
    event = await get_by_id(db, event_id)
    if event:
        event.attendee_count = max(0, event.attendee_count + delta)
        await db.flush()
    return event


async def delete_event(db: AsyncSession, event_id: str) -> bool:
    event = await get_by_id(db, event_id)
    if event:
        await db.delete(event)
        await db.flush()
        return True
    return False
