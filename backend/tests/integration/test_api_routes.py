"""Integration tests for API routes."""
import pytest

@pytest.mark.asyncio
async def test_health(client):
    response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

@pytest.mark.asyncio
async def test_full_auth_flow(client):
    # Signup
    resp = await client.post("/api/auth/signup", json={
        "email": "flow@test.com", "password": "pass123", "name": "Flow User"
    })
    assert resp.status_code == 200
    token = resp.json()["token"]

    # Get me with token
    resp = await client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.json()["email"] == "flow@test.com"
