"""Media upload routes."""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession

from api.middleware.auth import get_current_user_id
from api.utils.file_upload import validate_upload, get_upload_url
from database.connection import get_db
from database.repositories import media_repository

router = APIRouter(tags=["Media"])


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    """Upload a media file."""
    error = validate_upload(file)
    if error:
        raise HTTPException(status_code=400, detail=error)

    try:
        result = await get_upload_url(file, user_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Record in DB
    media = await media_repository.create_media_record(
        db,
        uploader_id=user_id,
        url=result["url"],
        media_type=result["media_type"],
        size_bytes=result["size"],
    )

    return {
        "url": result["url"],
        "public_id": media.public_id,
        "media_type": result["media_type"],
        "size": result["size"],
    }
