"""
JWT authentication middleware for FastAPI.
"""

from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from api.utils.security import decode_token

security_scheme = HTTPBearer(auto_error=False)


async def get_current_user_id(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
) -> str:
    """
    FastAPI dependency: extracts and verifies JWT from Authorization header.
    Returns user_id. Sets request.state.user_id.
    Raises 401 if token is invalid or missing.
    """
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = decode_token(credentials.credentials)
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        # Attach to request state for downstream use
        request.state.user_id = user_id
        return user_id

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


async def optional_auth(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
) -> str | None:
    """
    Optional auth dependency. Returns user_id or None if not authenticated.
    """
    if credentials is None:
        return None
    try:
        payload = decode_token(credentials.credentials)
        user_id = payload.get("sub")
        request.state.user_id = user_id
        return user_id
    except Exception:
        return None
