"""Pydantic schemas for Search."""

from typing import Any, List, Optional

from pydantic import BaseModel


class SearchQuery(BaseModel):
    q: str
    type: str = "users"  # users, posts, events
    page: int = 1
    limit: int = 20


class SearchResult(BaseModel):
    hits: List[Any] = []
    total: int = 0
    type: str = "users"
