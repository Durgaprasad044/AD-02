"""Pydantic schemas for Comment."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CommentCreate(BaseModel):
    content: str


class CommentResponse(BaseModel):
    id: str
    post_id: str
    content: str
    author: Optional[dict] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
