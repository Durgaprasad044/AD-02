"""
Standardized API response wrappers.
"""

from typing import Any, Optional


def success_response(data: Any = None, message: str = "Success") -> dict:
    """Wrap data in a standard success envelope."""
    return {
        "success": True,
        "message": message,
        "data": data,
    }


def error_response(message: str = "Error", code: int = 400, details: Optional[Any] = None) -> dict:
    """Wrap error message in a standard error envelope."""
    resp = {
        "success": False,
        "message": message,
        "code": code,
    }
    if details:
        resp["details"] = details
    return resp
