"""Unit tests for chat."""
import pytest

@pytest.mark.asyncio
async def test_get_chats_unauthenticated(client):
    response = await client.get("/api/chats")
    assert response.status_code == 401
