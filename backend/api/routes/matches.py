"""Match routes — frontend calls /matches."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from database.connection import get_db
from database.repositories import match_repository, profile_repository
from agents.shared.event_bus import publish

router = APIRouter(prefix="/matches", tags=["Matches"])


@router.get("")
async def get_matches(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get ranked matches — frontend calls GET /matches."""
    matches = await match_repository.get_matches_for_user(db, user_id, status="pending")

    result = []
    for match in matches:
        # Determine the "other" user
        other_id = match.user_id_2 if match.user_id_1 == user_id else match.user_id_1
        profile = await profile_repository.get_by_user_id(db, other_id)

        result.append({
            "id": match.id,
            "name": profile.display_name if profile else "User",
            "avatar": profile.avatar_url if profile else None,
            "bio": profile.bio if profile else None,
            "skills": profile.skills if profile else [],
            "compatibilityScore": match.compatibility_score,
        })

    return result


@router.post("/{match_id}/accept")
async def accept_match(
    match_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Accept a match — frontend calls POST /matches/:id/accept."""
    match = await match_repository.update_match_status(db, match_id, "accepted")
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    # Fire feedback event
    await publish("feedback:received", {
        "user_id": user_id,
        "type": "match_accepted",
        "target_id": match_id,
    })

    # Broadcast via WebSocket
    try:
        from ws.server import sio
        other_id = match.user_id_2 if match.user_id_1 == user_id else match.user_id_1
        await sio.emit("match:update", {"matchId": match_id, "status": "accepted"})
    except Exception:
        pass

    return {"success": True}


@router.post("/{match_id}/reject")
async def reject_match(
    match_id: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Reject a match — frontend calls POST /matches/:id/reject."""
    match = await match_repository.update_match_status(db, match_id, "rejected")
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    await publish("feedback:received", {
        "user_id": user_id,
        "type": "match_rejected",
        "target_id": match_id,
    })

    return {"success": True}
