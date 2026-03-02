"""Onboarding routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from api.models.onboarding import OnboardingData
from database.connection import get_db
from database.repositories import profile_repository

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])


@router.post("/complete")
async def complete_onboarding(
    data: OnboardingData,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Save onboarding data and trigger profile agent."""
    profile = await profile_repository.update_profile(
        db, user_id,
        skills=data.skills,
        goals=data.goals,
        availability=data.availability,
        bio=data.bio,
        interests=data.interests,
    )
    if not profile:
        profile = await profile_repository.create_profile(
            db, user_id,
            skills=data.skills, goals=data.goals,
            availability=data.availability, bio=data.bio,
            interests=data.interests,
        )

    # Trigger profile agent for embedding generation
    try:
        from agents.profile_agent.agent import run as run_profile_agent
        import asyncio
        asyncio.create_task(run_profile_agent(user_id, data.model_dump()))
    except Exception:
        pass

    return {"success": True, "message": "Onboarding complete"}


@router.get("/status")
async def onboarding_status(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Check onboarding completion status."""
    profile = await profile_repository.get_by_user_id(db, user_id)
    if profile and profile.skills and profile.goals:
        return {"is_complete": True, "step": None}
    return {"is_complete": False, "step": 1}
