"""Conversation repository — async CRUD operations."""

from datetime import datetime, timezone
from typing import List

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.conversation import Conversation


async def create_conversation(db: AsyncSession, participant_1_id: str,
                               participant_2_id: str) -> Conversation:
    conv = Conversation(participant_1_id=participant_1_id,
                        participant_2_id=participant_2_id)
    db.add(conv)
    await db.flush()
    return conv


async def get_by_participants(db: AsyncSession, user_1_id: str,
                               user_2_id: str) -> Conversation | None:
    result = await db.execute(
        select(Conversation).where(
            or_(
                (Conversation.participant_1_id == user_1_id) &
                (Conversation.participant_2_id == user_2_id),
                (Conversation.participant_1_id == user_2_id) &
                (Conversation.participant_2_id == user_1_id),
            )
        )
    )
    return result.scalar_one_or_none()


async def get_conversations_for_user(db: AsyncSession, user_id: str) -> List[Conversation]:
    result = await db.execute(
        select(Conversation).where(
            or_(
                Conversation.participant_1_id == user_id,
                Conversation.participant_2_id == user_id,
            )
        ).order_by(Conversation.last_message_at.desc().nullslast())
    )
    return list(result.scalars().all())


async def update_last_message_at(db: AsyncSession, conversation_id: str) -> None:
    result = await db.execute(
        select(Conversation).where(Conversation.id == conversation_id)
    )
    conv = result.scalar_one_or_none()
    if conv:
        conv.last_message_at = datetime.now(timezone.utc)
        await db.flush()
