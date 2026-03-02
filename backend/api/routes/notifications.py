"""Notification routes."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from database.connection import get_db
from database.repositories import notification_repository

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("")
async def get_notifications(
    page: int = 1,
    limit: int = 20,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get paginated notifications."""
    notifs = await notification_repository.get_for_user(db, user_id, page, limit)
    return [
        {
            "id": n.id,
            "type": n.type,
            "message": n.message,
            "reference_id": n.reference_id,
            "reference_type": n.reference_type,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat() if n.created_at else None,
        }
        for n in notifs
    ]


@router.put("/read")
async def mark_all_read(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Mark all notifications as read."""
    count = await notification_repository.mark_all_read(db, user_id)
    return {"success": True, "marked": count}


@router.put("/{notification_id}/read")
async def mark_read(
    notification_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Mark single notification as read."""
    await notification_repository.mark_read(db, notification_id)
    return {"success": True}
