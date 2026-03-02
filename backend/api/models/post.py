"""Pydantic schemas for Post."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AuthorInfo(BaseModel):
    id: str
    name: Optional[str] = None
    avatar: Optional[str] = None

    class Config:
        from_attributes = True


class PostCreate(BaseModel):
    content: str
    media_url: Optional[str] = None


class PostResponse(BaseModel):
    id: str
    content: str
    media_url: Optional[str] = None
    likes: int = 0
    comment_count: int = 0
    author: Optional[AuthorInfo] = None
    createdAt: Optional[str] = None

    class Config:
        from_attributes = True
