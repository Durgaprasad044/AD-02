"""Event RSVP routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from database.connection import get_db
from database.models.event_rsvp import EventRSVP
from database.repositories import event_repository
from sqlalchemy import select, and_

router = APIRouter(prefix="/events", tags=["Event RSVP"])


@router.post("/{event_id}/rsvp")
async def join_event(
    event_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """RSVP to an event."""
    # Check duplicate
    result = await db.execute(
        select(EventRSVP).where(
            and_(EventRSVP.event_id == event_id, EventRSVP.user_id == user_id)
        )
    )
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Already RSVPed")

    rsvp = EventRSVP(event_id=event_id, user_id=user_id)
    db.add(rsvp)
    await db.flush()

    await event_repository.update_attendee_count(db, event_id, delta=1)
    return {"success": True}


@router.delete("/{event_id}/rsvp")
async def leave_event(
    event_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Cancel RSVP."""
    result = await db.execute(
        select(EventRSVP).where(
            and_(EventRSVP.event_id == event_id, EventRSVP.user_id == user_id)
        )
    )
    rsvp = result.scalar_one_or_none()
    if not rsvp:
        raise HTTPException(status_code=404, detail="RSVP not found")

    await db.delete(rsvp)
    await db.flush()
    await event_repository.update_attendee_count(db, event_id, delta=-1)
    return {"success": True}
