"""Pydantic schemas for Media."""

from typing import Optional

from pydantic import BaseModel


class MediaUploadResponse(BaseModel):
    url: str
    public_id: Optional[str] = None
    media_type: str
    size: int
