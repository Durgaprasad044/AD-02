"""
CORS middleware configuration.
"""

from fastapi.middleware.cors import CORSMiddleware

from config.settings import get_settings


def add_cors_middleware(app):
    """Add CORS middleware to the FastAPI app."""
    settings = get_settings()

    origins = [
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
