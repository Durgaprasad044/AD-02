"""Pydantic schemas for Profile."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class ProfileUpdate(BaseModel):
    display_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    skills: Optional[List[str]] = None
    goals: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    availability: Optional[str] = None


class ProfileResponse(BaseModel):
    id: str
    user_id: str
    display_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    skills: Optional[List[str]] = []
    goals: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    availability: Optional[str] = "available"
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
