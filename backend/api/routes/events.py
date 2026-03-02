"""Events routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from api.models.event import EventCreate
from database.connection import get_db
from database.repositories import event_repository, profile_repository

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("")
async def get_events(
    page: int = 1,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Get events list."""
    events = await event_repository.get_events(db, page, limit)
    result = []
    for event in events:
        profile = await profile_repository.get_by_user_id(db, event.creator_id) if event.creator_id else None
        result.append({
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "event_date": event.event_date.isoformat() if event.event_date else None,
            "location": event.location,
            "capacity": event.capacity,
            "attendee_count": event.attendee_count,
            "creator": {
                "id": event.creator_id,
                "name": profile.display_name if profile else "User",
            } if event.creator_id else None,
        })
    return result


@router.post("")
async def create_event(
    data: EventCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Create an event."""
    event = await event_repository.create_event(
        db, creator_id=user_id,
        title=data.title, description=data.description,
        event_date=data.event_date, location=data.location,
        capacity=data.capacity,
    )
    return {"id": event.id, "title": event.title}


@router.get("/{event_id}")
async def get_event(event_id: str, db: AsyncSession = Depends(get_db)):
    """Get single event."""
    event = await event_repository.get_by_id(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return {
        "id": event.id,
        "title": event.title,
        "description": event.description,
        "event_date": event.event_date.isoformat() if event.event_date else None,
        "location": event.location,
        "capacity": event.capacity,
        "attendee_count": event.attendee_count,
    }
