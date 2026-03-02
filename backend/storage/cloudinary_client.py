"""Cloudinary storage client."""

import logging
logger = logging.getLogger(__name__)


def upload_image(file_bytes: bytes, folder: str = "uploads",
                 transformations: dict = None) -> str:
    """Upload image to Cloudinary and return CDN URL."""
    try:
        import cloudinary
        import cloudinary.uploader
        from config.settings import get_settings
        settings = get_settings()

        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
        )

        upload_options = {"folder": folder}
        if transformations:
            upload_options["transformation"] = transformations

        result = cloudinary.uploader.upload(file_bytes, **upload_options)
        return result.get("secure_url", result.get("url", ""))
    except Exception as e:
        logger.error(f"Cloudinary upload failed: {e}")
        raise
