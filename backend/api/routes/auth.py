"""Auth routes — signup, login, logout, refresh, me."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from api.models.user import LoginRequest, TokenResponse, UserCreate, UserResponse
from api.utils.response import success_response, error_response
from api.utils.security import create_access_token, create_refresh_token, decode_token, hash_password, verify_password
from database.connection import get_db
from database.repositories import user_repository, profile_repository

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup")
async def signup(data: UserCreate, db: AsyncSession = Depends(get_db)):
    """Register a new user."""
    existing = await user_repository.get_by_email(db, data.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    password_hash = hash_password(data.password)
    user = await user_repository.create_user(db, data.email, password_hash)

    # Create blank profile
    display_name = data.name or data.email.split("@")[0]
    await profile_repository.create_profile(db, user.id, display_name=display_name)

    token = create_access_token(user.id)
    refresh = create_refresh_token(user.id)

    return {
        "token": token,
        "refresh_token": refresh,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": display_name,
        },
    }


@router.post("/register")
async def register(data: UserCreate, db: AsyncSession = Depends(get_db)):
    """Alias for signup — frontend uses /auth/register."""
    return await signup(data, db)


@router.post("/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login with email and password."""
    user = await user_repository.get_by_email(db, data.email)
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user.id)
    refresh = create_refresh_token(user.id)

    profile = await profile_repository.get_by_user_id(db, user.id)

    return {
        "token": token,
        "refresh_token": refresh,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": profile.display_name if profile else user.email.split("@")[0],
            "bio": profile.bio if profile else None,
            "avatar": profile.avatar_url if profile else None,
        },
    }


@router.post("/logout")
async def logout():
    """Logout — client should discard token."""
    return success_response(message="Logged out successfully")


@router.post("/refresh-token")
async def refresh_token(token: str):
    """Refresh access token using refresh token."""
    try:
        payload = decode_token(token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        new_access = create_access_token(payload["sub"])
        return {"token": new_access}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")


@router.get("/me")
async def get_me(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get current user profile — frontend calls GET /auth/me."""
    user = await user_repository.get_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = await profile_repository.get_by_user_id(db, user_id)

    return {
        "id": user.id,
        "email": user.email,
        "name": profile.display_name if profile else user.email.split("@")[0],
        "bio": profile.bio if profile else None,
        "avatar": profile.avatar_url if profile else None,
    }


@router.put("/me")
async def update_me(
    data: dict,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Update current user profile — frontend calls PUT /auth/me."""
    profile = await profile_repository.get_by_user_id(db, user_id)
    if not profile:
        profile = await profile_repository.create_profile(db, user_id)

    update_data = {}
    if "name" in data:
        update_data["display_name"] = data["name"]
    if "bio" in data:
        update_data["bio"] = data["bio"]
    if "avatar" in data:
        update_data["avatar_url"] = data["avatar"]
    if "email" in data:
        await user_repository.update_user(db, user_id, email=data["email"])

    if update_data:
        await profile_repository.update_profile(db, user_id, **update_data)

    user = await user_repository.get_by_id(db, user_id)
    profile = await profile_repository.get_by_user_id(db, user_id)

    return {
        "id": user.id,
        "email": user.email,
        "name": profile.display_name if profile else None,
        "bio": profile.bio if profile else None,
        "avatar": profile.avatar_url if profile else None,
    }
