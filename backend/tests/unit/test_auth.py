"""Unit tests for auth routes."""

import pytest
from httpx import ASGITransport, AsyncClient
from api.main import app


@pytest.mark.asyncio
async def test_signup(client):
    response = await client.post("/api/auth/signup", json={
        "email": "signup@test.com",
        "password": "password123",
        "name": "Signup User",
    })
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert data["user"]["email"] == "signup@test.com"


@pytest.mark.asyncio
async def test_login(client):
    # First signup
    await client.post("/api/auth/signup", json={
        "email": "login@test.com",
        "password": "password123",
    })
    # Then login
    response = await client.post("/api/auth/login", json={
        "email": "login@test.com",
        "password": "password123",
    })
    assert response.status_code == 200
    assert "token" in response.json()


@pytest.mark.asyncio
async def test_login_wrong_password(client):
    await client.post("/api/auth/signup", json={
        "email": "wrong@test.com",
        "password": "password123",
    })
    response = await client.post("/api/auth/login", json={
        "email": "wrong@test.com",
        "password": "wrongpassword",
    })
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_me_unauthenticated(client):
    response = await client.get("/api/auth/me")
    assert response.status_code == 401
