"""
FastAPI main application entry point.
Creates the app, registers routers, middleware, and Socket.IO.
"""

import logging
import sys
import os

# Add backend to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from api.middleware.cors import add_cors_middleware
from api.middleware.rate_limit import rate_limit_middleware
from database.connection import create_tables

# Import all models so Base.metadata knows about them
from database.models.user import User  # noqa: F401
from database.models.profile import Profile  # noqa: F401
from database.models.match import Match  # noqa: F401
from database.models.post import Post  # noqa: F401
from database.models.comment import Comment  # noqa: F401
from database.models.conversation import Conversation  # noqa: F401
from database.models.message import Message  # noqa: F401
from database.models.event import Event  # noqa: F401
from database.models.event_rsvp import EventRSVP  # noqa: F401
from database.models.notification import Notification  # noqa: F401
from database.models.media import Media  # noqa: F401

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    logger.info("Starting ATRIUS backend...")
    await create_tables()
    logger.info("Database tables created")
    yield
    logger.info("Shutting down ATRIUS backend...")


# Create FastAPI app
app = FastAPI(
    title="ATRIUS API",
    description="Backend API for ATRIUS networking platform",
    version="1.0.0",
    lifespan=lifespan,
)

# Add CORS middleware
add_cors_middleware(app)

# Add rate limiting middleware
app.middleware("http")(rate_limit_middleware)

# Import and register routers
from api.routes.auth import router as auth_router
from api.routes.profiles import router as profiles_router
from api.routes.users import router as users_router
from api.routes.matches import router as matches_router
from api.routes.feed import router as feed_router
from api.routes.comments import router as comments_router
from api.routes.chat import router as chat_router
from api.routes.events import router as events_router
from api.routes.event_rsvp import router as event_rsvp_router
from api.routes.notifications import router as notifications_router
from api.routes.search import router as search_router
from api.routes.media import router as media_router
from api.routes.onboarding import router as onboarding_router

# All routes are prefixed with /api to match frontend expectations
app.include_router(auth_router, prefix="/api")
app.include_router(profiles_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(matches_router, prefix="/api")
app.include_router(feed_router, prefix="/api")
app.include_router(comments_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(events_router, prefix="/api")
app.include_router(event_rsvp_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")
app.include_router(search_router, prefix="/api")
app.include_router(media_router, prefix="/api")
app.include_router(onboarding_router, prefix="/api")


# Health check
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "ATRIUS API"}


# Mount Socket.IO
from ws.server import socket_app
app.mount("/socket.io", socket_app)

# Mount static files for local uploads
upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "tmp", "uploads")
os.makedirs(upload_dir, exist_ok=True)
app.mount("/static/uploads", StaticFiles(directory=upload_dir), name="uploads")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)
