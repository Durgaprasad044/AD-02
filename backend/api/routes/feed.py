"""Feed routes — posts CRUD. Frontend calls /posts."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id, optional_auth
from api.models.post import PostCreate
from database.connection import get_db
from database.repositories import post_repository, profile_repository

router = APIRouter(tags=["Feed"])


@router.get("/posts")
async def get_posts(
    page: int = 1,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Get paginated post feed — frontend calls GET /posts."""
    posts = await post_repository.get_feed_posts(db, page=page, limit=limit)

    result = []
    for post in posts:
        author = post.author
        profile = await profile_repository.get_by_user_id(db, author.id) if author else None
        result.append({
            "id": post.id,
            "content": post.content,
            "createdAt": post.created_at.isoformat() if post.created_at else None,
            "likes": post.like_count,
            "comment_count": post.comment_count,
            "media_url": post.media_url,
            "author": {
                "id": author.id if author else None,
                "name": profile.display_name if profile else (author.email.split("@")[0] if author else "Unknown"),
                "avatar": profile.avatar_url if profile else None,
            } if author else None,
        })

    return result


@router.post("/posts")
async def create_post(
    data: PostCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Create a new post — frontend calls POST /posts."""
    post = await post_repository.create_post(
        db, author_id=user_id, content=data.content, media_url=data.media_url
    )
    author = post.author
    profile = await profile_repository.get_by_user_id(db, user_id)

    result = {
        "id": post.id,
        "content": post.content,
        "createdAt": post.created_at.isoformat() if post.created_at else None,
        "likes": 0,
        "comment_count": 0,
        "author": {
            "id": user_id,
            "name": profile.display_name if profile else "User",
            "avatar": profile.avatar_url if profile else None,
        },
    }

    # Broadcast via WebSocket
    try:
        from ws.server import sio
        await sio.emit("post:new", result)
    except Exception:
        pass

    return result


@router.get("/posts/{post_id}")
async def get_post(post_id: str, db: AsyncSession = Depends(get_db)):
    """Get single post by ID."""
    post = await post_repository.get_by_id(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    profile = await profile_repository.get_by_user_id(db, post.author_id) if post.author_id else None
    return {
        "id": post.id,
        "content": post.content,
        "createdAt": post.created_at.isoformat() if post.created_at else None,
        "likes": post.like_count,
        "comment_count": post.comment_count,
        "author": {
            "id": post.author_id,
            "name": profile.display_name if profile else "User",
            "avatar": profile.avatar_url if profile else None,
        },
    }


@router.delete("/posts/{post_id}")
async def delete_post(
    post_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Delete a post."""
    post = await post_repository.get_by_id(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.author_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    await post_repository.delete_post(db, post_id)
    return {"success": True}


@router.post("/posts/{post_id}/like")
async def like_post(
    post_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Like a post — frontend calls POST /posts/{id}/like."""
    post = await post_repository.increment_like_count(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"success": True, "likes": post.like_count}
