"""Unit tests for profile routes."""

import pytest


@pytest.mark.asyncio
async def test_get_profile_unauthenticated(client):
    response = await client.get("/api/profiles/me")
    assert response.status_code == 401
