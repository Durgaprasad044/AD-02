"""
Pagination utilities for FastAPI.
"""

from typing import Any, List

from fastapi import Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession


class PaginationParams:
    """FastAPI dependency for pagination parameters."""

    def __init__(
        self,
        page: int = Query(1, ge=1, description="Page number"),
        limit: int = Query(20, ge=1, le=100, description="Items per page"),
    ):
        self.page = page
        self.limit = limit
        self.offset = (page - 1) * limit


async def paginate(
    db: AsyncSession,
    query,
    page: int,
    limit: int,
) -> dict:
    """
    Execute a paginated query and return items + metadata.

    Returns: { items: [...], total: int, page: int, limit: int, has_next: bool }
    """
    offset = (page - 1) * limit

    # Get total count
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar() or 0

    # Get items
    paginated_query = query.offset(offset).limit(limit)
    result = await db.execute(paginated_query)
    items = result.scalars().all()

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "has_next": (page * limit) < total,
    }
