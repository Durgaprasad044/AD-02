"""Unit tests for feed/post routes."""

import pytest


@pytest.mark.asyncio
async def test_get_posts(client):
    response = await client.get("/api/posts")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_create_post_unauthenticated(client):
    response = await client.post("/api/posts", json={"content": "Hello"})
    assert response.status_code == 401
