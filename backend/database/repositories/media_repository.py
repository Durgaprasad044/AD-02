"""Media repository — async CRUD operations."""

from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.media import Media


async def create_media_record(db: AsyncSession, uploader_id: str, url: str,
                               media_type: str, size_bytes: int = 0,
                               public_id: str = None) -> Media:
    media = Media(uploader_id=uploader_id, url=url, media_type=media_type,
                  size_bytes=size_bytes, public_id=public_id)
    db.add(media)
    await db.flush()
    return media


async def get_by_id(db: AsyncSession, media_id: str) -> Media | None:
    result = await db.execute(select(Media).where(Media.id == media_id))
    return result.scalar_one_or_none()


async def get_by_uploader(db: AsyncSession, uploader_id: str) -> List[Media]:
    result = await db.execute(
        select(Media).where(Media.uploader_id == uploader_id)
        .order_by(Media.created_at.desc())
    )
    return list(result.scalars().all())


async def delete_media_record(db: AsyncSession, media_id: str) -> bool:
    media = await get_by_id(db, media_id)
    if media:
        await db.delete(media)
        await db.flush()
        return True
    return False
