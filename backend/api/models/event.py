"""Pydantic schemas for Event."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    event_date: datetime
    location: Optional[str] = None
    capacity: Optional[int] = None


class EventResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    event_date: Optional[datetime] = None
    location: Optional[str] = None
    capacity: Optional[int] = None
    attendee_count: int = 0
    is_attending: bool = False
    creator: Optional[dict] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
