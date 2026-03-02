"""Chat routes — conversations and messages. Frontend calls /chats."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from api.models.message import MessageCreate
from database.connection import get_db
from database.repositories import conversation_repository, message_repository, profile_repository

router = APIRouter(prefix="/chats", tags=["Chat"])


@router.get("")
async def get_conversations(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get all conversations — frontend calls GET /chats."""
    convos = await conversation_repository.get_conversations_for_user(db, user_id)

    result = []
    for conv in convos:
        other_id = conv.participant_2_id if conv.participant_1_id == user_id else conv.participant_1_id
        profile = await profile_repository.get_by_user_id(db, other_id)

        # Get last message
        messages = await message_repository.get_messages_by_conversation(db, conv.id, page=1, limit=1)
        last_msg = messages[-1] if messages else None

        result.append({
            "id": conv.id,
            "name": profile.display_name if profile else "User",
            "avatar": profile.avatar_url if profile else None,
            "lastMessage": {
                "content": last_msg.content if last_msg else None,
            } if last_msg else None,
        })

    return result


@router.post("")
async def create_conversation(
    data: dict,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Create conversation — frontend calls POST /chats."""
    participant_id = data.get("participantId")
    if not participant_id:
        raise HTTPException(status_code=400, detail="participantId required")

    # Check if conversation already exists
    existing = await conversation_repository.get_by_participants(db, user_id, participant_id)
    if existing:
        return {"id": existing.id}

    conv = await conversation_repository.create_conversation(db, user_id, participant_id)
    return {"id": conv.id}


@router.get("/{chat_id}/messages")
async def get_messages(
    chat_id: str,
    page: int = 1,
    limit: int = 50,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Get messages for a chat — frontend calls GET /chats/:id/messages."""
    messages = await message_repository.get_messages_by_conversation(db, chat_id, page, limit)

    return [
        {
            "id": msg.id,
            "chatId": msg.conversation_id,
            "senderId": msg.sender_id,
            "content": msg.content,
            "createdAt": msg.created_at.isoformat() if msg.created_at else None,
        }
        for msg in messages
    ]


@router.post("/{chat_id}/messages")
async def send_message(
    chat_id: str,
    data: MessageCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Send a message — frontend calls POST /chats/:id/messages."""
    msg = await message_repository.create_message(
        db, conversation_id=chat_id, sender_id=user_id, content=data.content
    )
    await conversation_repository.update_last_message_at(db, chat_id)

    result = {
        "id": msg.id,
        "chatId": msg.conversation_id,
        "senderId": msg.sender_id,
        "content": msg.content,
        "createdAt": msg.created_at.isoformat() if msg.created_at else None,
    }

    # Broadcast via WebSocket
    try:
        from ws.server import sio
        await sio.emit("message:received", result)
    except Exception:
        pass

    return result
