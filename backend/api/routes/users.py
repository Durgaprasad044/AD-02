"""Users routes — public profile viewing."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database.connection import get_db
from database.repositories import user_repository, profile_repository

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/{user_id}")
async def get_user(user_id: str, db: AsyncSession = Depends(get_db)):
    """Get public user profile."""
    user = await user_repository.get_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = await profile_repository.get_by_user_id(db, user_id)

    return {
        "id": user.id,
        "name": profile.display_name if profile else user.email.split("@")[0],
        "bio": profile.bio if profile else None,
        "avatar": profile.avatar_url if profile else None,
        "skills": profile.skills if profile else [],
        "goals": profile.goals if profile else [],
        "availability": profile.availability if profile else "available",
    }
