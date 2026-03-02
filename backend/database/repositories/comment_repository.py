"""Comment repository — async CRUD operations."""

from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.comment import Comment


async def create_comment(db: AsyncSession, post_id: str, author_id: str,
                         content: str) -> Comment:
    comment = Comment(post_id=post_id, author_id=author_id, content=content)
    db.add(comment)
    await db.flush()
    return comment


async def get_comments_by_post(db: AsyncSession, post_id: str,
                                page: int = 1, limit: int = 20) -> List[Comment]:
    offset = (page - 1) * limit
    result = await db.execute(
        select(Comment)
        .where(Comment.post_id == post_id)
        .order_by(Comment.created_at.asc())
        .offset(offset).limit(limit)
    )
    return list(result.scalars().all())


async def delete_comment(db: AsyncSession, comment_id: str) -> bool:
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalar_one_or_none()
    if comment:
        await db.delete(comment)
        await db.flush()
        return True
    return False


async def get_by_id(db: AsyncSession, comment_id: str) -> Comment | None:
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    return result.scalar_one_or_none()
