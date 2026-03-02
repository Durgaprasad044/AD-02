"""Pydantic schemas for Match."""

from typing import List, Optional

from pydantic import BaseModel


class MatchResponse(BaseModel):
    id: str
    name: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    skills: Optional[List[str]] = []
    compatibilityScore: Optional[float] = 0.0

    class Config:
        from_attributes = True


class MatchActionRequest(BaseModel):
    action: str  # "accept" or "reject"
