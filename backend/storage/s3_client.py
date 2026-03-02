"""S3 storage client."""

import logging
logger = logging.getLogger(__name__)


async def upload_file(file_bytes: bytes, key: str, content_type: str) -> str:
    """Upload file to S3 and return public URL."""
    try:
        import boto3
        from config.settings import get_settings
        settings = get_settings()

        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION,
        )
        s3.put_object(
            Bucket=settings.AWS_S3_BUCKET,
            Key=key,
            Body=file_bytes,
            ContentType=content_type,
        )
        url = f"https://{settings.AWS_S3_BUCKET}.s3.{settings.AWS_REGION}.amazonaws.com/{key}"
        return url
    except Exception as e:
        logger.error(f"S3 upload failed: {e}")
        raise


async def delete_file(key: str):
    """Delete file from S3."""
    try:
        import boto3
        from config.settings import get_settings
        settings = get_settings()

        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION,
        )
        s3.delete_object(Bucket=settings.AWS_S3_BUCKET, Key=key)
    except Exception as e:
        logger.error(f"S3 delete failed: {e}")
        raise
