"""Message repository — async CRUD operations."""

from typing import List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.message import Message


async def create_message(db: AsyncSession, conversation_id: str, sender_id: str,
                         content: str, media_url: str = None) -> Message:
    msg = Message(conversation_id=conversation_id, sender_id=sender_id,
                  content=content, media_url=media_url)
    db.add(msg)
    await db.flush()
    return msg


async def get_messages_by_conversation(db: AsyncSession, conversation_id: str,
                                        page: int = 1, limit: int = 50) -> List[Message]:
    offset = (page - 1) * limit
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
        .offset(offset).limit(limit)
    )
    return list(result.scalars().all())


async def mark_as_read(db: AsyncSession, conversation_id: str, user_id: str) -> int:
    """Mark all unread messages in a conversation as read (for messages not sent by user)."""
    result = await db.execute(
        select(Message).where(
            Message.conversation_id == conversation_id,
            Message.sender_id != user_id,
            Message.is_read == False,
        )
    )
    messages = result.scalars().all()
    for msg in messages:
        msg.is_read = True
    await db.flush()
    return len(messages)


async def get_unread_count(db: AsyncSession, user_id: str) -> int:
    result = await db.execute(
        select(func.count(Message.id)).where(
            Message.sender_id != user_id,
            Message.is_read == False,
        )
    )
    return result.scalar() or 0
