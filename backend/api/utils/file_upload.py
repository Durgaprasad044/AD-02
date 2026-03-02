"""
File upload validation and storage delegation.
"""

from typing import Optional

from fastapi import UploadFile

ALLOWED_TYPES = {
    "image/jpeg", "image/png", "image/webp", "image/gif",
    "video/mp4", "video/webm",
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def validate_upload(file: UploadFile) -> Optional[str]:
    """
    Validate uploaded file type and size.
    Returns error message string, or None if valid.
    """
    if file.content_type not in ALLOWED_TYPES:
        return f"File type '{file.content_type}' not allowed. Allowed: {', '.join(ALLOWED_TYPES)}"
    return None


async def get_upload_url(file: UploadFile, uploader_id: str) -> dict:
    """
    Upload file using configured storage backend and return result dict.
    Falls back to local storage.
    """
    from config.settings import get_settings

    settings = get_settings()
    file_bytes = await file.read()

    if len(file_bytes) > MAX_FILE_SIZE:
        raise ValueError(f"File exceeds maximum size of {MAX_FILE_SIZE // (1024*1024)} MB")

    if settings.STORAGE_BACKEND == "s3":
        from storage.s3_client import upload_file as s3_upload
        url = await s3_upload(file_bytes, f"uploads/{uploader_id}/{file.filename}", file.content_type)
    elif settings.STORAGE_BACKEND == "cloudinary":
        from storage.cloudinary_client import upload_image
        url = upload_image(file_bytes, folder=f"uploads/{uploader_id}")
    else:
        from storage.local_storage import save_file
        url = save_file(file_bytes, file.filename)

    return {
        "url": url,
        "media_type": "image" if file.content_type.startswith("image") else "video",
        "size": len(file_bytes),
        "filename": file.filename,
    }
