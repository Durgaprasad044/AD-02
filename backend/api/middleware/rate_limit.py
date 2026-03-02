"""
Simple in-memory rate limiter (Redis-backed when available).
"""

import time
from collections import defaultdict

from fastapi import HTTPException, Request


# In-memory fallback store: { key: [timestamps] }
_rate_store: dict = defaultdict(list)

# Config
RATE_LIMIT_REQUESTS = 100  # max requests
RATE_LIMIT_WINDOW = 60  # seconds


async def rate_limit_middleware(request: Request, call_next):
    """
    Rate limiter middleware. Uses client IP as key.
    Returns 429 when exceeded.
    """
    client_ip = request.client.host if request.client else "unknown"
    key = f"rate:{client_ip}"
    now = time.time()

    # Clean old entries
    _rate_store[key] = [t for t in _rate_store[key] if now - t < RATE_LIMIT_WINDOW]

    if len(_rate_store[key]) >= RATE_LIMIT_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail="Too many requests",
            headers={"Retry-After": str(RATE_LIMIT_WINDOW)},
        )

    _rate_store[key].append(now)
    response = await call_next(request)
    return response
