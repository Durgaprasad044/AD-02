"""WebSocket broadcast utilities."""

import json
import logging

logger = logging.getLogger(__name__)

# Connection registry: { user_id: sid }
_connections: dict = {}


def register_connection(user_id: str, sid: str):
    """Register a user's Socket.IO session."""
    _connections[user_id] = sid


def unregister_connection(sid: str):
    """Unregister by session ID."""
    for uid, s in list(_connections.items()):
        if s == sid:
            del _connections[uid]
            break


def get_sid(user_id: str) -> str | None:
    """Get Socket.IO session ID for a user."""
    return _connections.get(user_id)


def get_all_connections() -> dict:
    """Get all active connections."""
    return _connections.copy()


async def send_to_user(sio, user_id: str, event_type: str, payload: dict):
    """Send event to specific user if online."""
    sid = get_sid(user_id)
    if sid:
        try:
            await sio.emit(event_type, payload, to=sid)
        except Exception as e:
            logger.warning(f"Failed to send to {user_id}: {e}")
    else:
        logger.debug(f"User {user_id} is offline, skipping WS send")
