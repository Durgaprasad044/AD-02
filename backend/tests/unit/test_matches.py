"""Unit tests for matches."""
import pytest

@pytest.mark.asyncio
async def test_get_matches_unauthenticated(client):
    response = await client.get("/api/matches")
    assert response.status_code == 401
