"""Pydantic schemas for Onboarding."""

from typing import List, Optional

from pydantic import BaseModel


class OnboardingData(BaseModel):
    skills: Optional[List[str]] = []
    goals: Optional[List[str]] = []
    availability: Optional[str] = "available"
    bio: Optional[str] = None
    interests: Optional[List[str]] = []


class OnboardingStatusResponse(BaseModel):
    is_complete: bool = False
    step: Optional[int] = None
