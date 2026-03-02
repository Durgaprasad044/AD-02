"""Unit tests for events."""
import pytest

@pytest.mark.asyncio
async def test_get_events(client):
    response = await client.get("/api/events")
    assert response.status_code == 200
