"""Search routes."""

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.connection import get_db
from database.models.user import User
from database.models.post import Post
from database.models.event import Event
from database.repositories import profile_repository

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("")
async def search(
    q: str = Query("", description="Search query"),
    type: str = Query("users", description="Search type: users/posts/events"),
    page: int = 1,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Search users, posts, or events."""
    offset = (page - 1) * limit
    hits = []

    if type == "users":
        from database.models.profile import Profile
        result = await db.execute(
            select(Profile)
            .where(Profile.display_name.ilike(f"%{q}%"))
            .offset(offset).limit(limit)
        )
        profiles = result.scalars().all()
        hits = [
            {"id": p.user_id, "name": p.display_name, "bio": p.bio, "avatar": p.avatar_url}
            for p in profiles
        ]

    elif type == "posts":
        result = await db.execute(
            select(Post)
            .where(Post.content.ilike(f"%{q}%"))
            .order_by(Post.created_at.desc())
            .offset(offset).limit(limit)
        )
        posts = result.scalars().all()
        hits = [{"id": p.id, "content": p.content} for p in posts]

    elif type == "events":
        result = await db.execute(
            select(Event)
            .where(Event.title.ilike(f"%{q}%"))
            .offset(offset).limit(limit)
        )
        events = result.scalars().all()
        hits = [{"id": e.id, "title": e.title} for e in events]

    return {"hits": hits, "total": len(hits), "type": type}
