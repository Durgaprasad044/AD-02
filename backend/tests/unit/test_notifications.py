"""Unit tests for notifications."""
import pytest

@pytest.mark.asyncio
async def test_get_notifications_unauthenticated(client):
    response = await client.get("/api/notifications")
    assert response.status_code == 401
