"""Pydantic schemas for Message."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class MessageCreate(BaseModel):
    content: str
    media_url: Optional[str] = None


class MessageResponse(BaseModel):
    id: str
    chatId: Optional[str] = None
    senderId: Optional[str] = None
    content: str
    media_url: Optional[str] = None
    is_read: bool = False
    createdAt: Optional[str] = None

    class Config:
        from_attributes = True
