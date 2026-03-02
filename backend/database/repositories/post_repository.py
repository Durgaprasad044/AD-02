"""Post repository — async CRUD operations."""

from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.post import Post


async def create_post(db: AsyncSession, author_id: str, content: str,
                      media_url: str = None) -> Post:
    post = Post(author_id=author_id, content=content, media_url=media_url)
    db.add(post)
    await db.flush()
    return post


async def get_feed_posts(db: AsyncSession, page: int = 1, limit: int = 20) -> List[Post]:
    offset = (page - 1) * limit
    result = await db.execute(
        select(Post).order_by(Post.created_at.desc()).offset(offset).limit(limit)
    )
    return list(result.scalars().all())


async def get_by_id(db: AsyncSession, post_id: str) -> Post | None:
    result = await db.execute(select(Post).where(Post.id == post_id))
    return result.scalar_one_or_none()


async def delete_post(db: AsyncSession, post_id: str) -> bool:
    post = await get_by_id(db, post_id)
    if post:
        await db.delete(post)
        await db.flush()
        return True
    return False


async def increment_like_count(db: AsyncSession, post_id: str) -> Post | None:
    post = await get_by_id(db, post_id)
    if post:
        post.like_count += 1
        await db.flush()
    return post


async def increment_comment_count(db: AsyncSession, post_id: str) -> Post | None:
    post = await get_by_id(db, post_id)
    if post:
        post.comment_count += 1
        await db.flush()
    return post
