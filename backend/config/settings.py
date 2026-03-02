"""
Application settings loaded from environment variables.
Uses Pydantic BaseSettings for validation and type casting.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./atrius.db"

    # JWT
    JWT_SECRET: str = "dev-secret-change-me"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Pinecone
    PINECONE_API_KEY: str = ""
    PINECONE_INDEX_NAME: str = "atrius-embeddings"

    # OpenAI
    OPENAI_API_KEY: str = ""

    # AWS S3
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_S3_BUCKET: str = "atrius-uploads"
    AWS_REGION: str = "us-east-1"

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # Storage backend
    STORAGE_BACKEND: str = "local"  # "s3", "cloudinary", or "local"

    # Frontend
    FRONTEND_URL: str = "http://localhost:5173"

    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"

    # Embedding model
    EMBEDDING_MODEL: str = "sentence-transformers"  # or "openai"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Singleton settings instance."""
    return Settings()
