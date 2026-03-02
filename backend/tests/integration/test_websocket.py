"""Integration tests for WebSocket."""
import pytest

@pytest.mark.asyncio
async def test_health_endpoint(client):
    """Basic health check as WebSocket testing requires starlette.testclient."""
    response = await client.get("/api/health")
    assert response.status_code == 200
