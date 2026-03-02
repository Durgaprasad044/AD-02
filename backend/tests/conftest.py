"""Pytest fixtures for tests."""

import asyncio
import os
import sys

import pytest
import pytest_asyncio

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Override DATABASE_URL before importing app
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///./test.db"

from httpx import ASGITransport, AsyncClient
from api.main import app
from database.connection import create_tables, engine, Base


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_db():
    """Create test database tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    # Clean up test.db
    if os.path.exists("test.db"):
        os.remove("test.db")


@pytest_asyncio.fixture
async def client():
    """Async test client."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest_asyncio.fixture
async def auth_client(client):
    """Authenticated test client (creates user and returns client + token)."""
    response = await client.post("/api/auth/signup", json={
        "email": "test@example.com",
        "password": "testpass123",
        "name": "Test User",
    })
    data = response.json()
    token = data.get("token")

    transport = ASGITransport(app=app)
    async with AsyncClient(
        transport=transport,
        base_url="http://test",
        headers={"Authorization": f"Bearer {token}"},
    ) as ac:
        yield ac, data
