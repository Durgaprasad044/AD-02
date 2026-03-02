"""Comments routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from api.models.comment import CommentCreate
from database.connection import get_db
from database.repositories import comment_repository, post_repository, profile_repository

router = APIRouter(tags=["Comments"])


@router.get("/posts/{post_id}/comments")
async def get_comments(
    post_id: str,
    page: int = 1,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Get comments for a post."""
    comments = await comment_repository.get_comments_by_post(db, post_id, page, limit)
    result = []
    for c in comments:
        profile = await profile_repository.get_by_user_id(db, c.author_id) if c.author_id else None
        result.append({
            "id": c.id,
            "post_id": c.post_id,
            "content": c.content,
            "created_at": c.created_at.isoformat() if c.created_at else None,
            "author": {
                "id": c.author_id,
                "name": profile.display_name if profile else "User",
                "avatar": profile.avatar_url if profile else None,
            },
        })
    return result


@router.post("/posts/{post_id}/comments")
async def create_comment(
    post_id: str,
    data: CommentCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Create a comment on a post."""
    comment = await comment_repository.create_comment(db, post_id, user_id, data.content)
    await post_repository.increment_comment_count(db, post_id)

    profile = await profile_repository.get_by_user_id(db, user_id)
    return {
        "id": comment.id,
        "post_id": comment.post_id,
        "content": comment.content,
        "created_at": comment.created_at.isoformat() if comment.created_at else None,
        "author": {
            "id": user_id,
            "name": profile.display_name if profile else "User",
            "avatar": profile.avatar_url if profile else None,
        },
    }


@router.delete("/comments/{comment_id}")
async def delete_comment(
    comment_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Delete a comment."""
    comment = await comment_repository.get_by_id(db, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.author_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    await comment_repository.delete_comment(db, comment_id)
    return {"success": True}
