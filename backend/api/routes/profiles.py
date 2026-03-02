"""Profile routes — own profile management."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from api.models.profile import ProfileUpdate
from database.connection import get_db
from database.repositories import profile_repository

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.get("/me")
async def get_my_profile(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get logged-in user's profile."""
    profile = await profile_repository.get_by_user_id(db, user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {
        "id": profile.id,
        "user_id": profile.user_id,
        "display_name": profile.display_name,
        "bio": profile.bio,
        "avatar_url": profile.avatar_url,
        "skills": profile.skills or [],
        "goals": profile.goals or [],
        "interests": profile.interests or [],
        "availability": profile.availability,
    }


@router.put("/me")
async def update_my_profile(
    data: ProfileUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Update logged-in user's profile. Triggers embedding regeneration."""
    profile = await profile_repository.update_profile(
        db, user_id,
        display_name=data.display_name,
        bio=data.bio,
        avatar_url=data.avatar_url,
        skills=data.skills,
        goals=data.goals,
        interests=data.interests,
        availability=data.availability,
    )
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Trigger embedding regeneration in background
    try:
        from agents.profile_agent.agent import run as run_profile_agent
        import asyncio
        asyncio.create_task(run_profile_agent(user_id, {
            "bio": profile.bio,
            "skills": profile.skills,
            "goals": profile.goals,
        }))
    except Exception:
        pass

    return {
        "id": profile.id,
        "user_id": profile.user_id,
        "display_name": profile.display_name,
        "bio": profile.bio,
        "avatar_url": profile.avatar_url,
        "skills": profile.skills or [],
        "goals": profile.goals or [],
        "availability": profile.availability,
    }
