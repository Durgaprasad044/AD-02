"""Socket.IO server setup for FastAPI."""

import logging

import socketio

from ws.broadcast import register_connection, unregister_connection
from ws.handlers import handle_chat_message, handle_typing_indicator, handle_read_receipt

logger = logging.getLogger(__name__)

# Create Socket.IO server (async mode for FastAPI)
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=False,
    engineio_logger=False,
)

# Create ASGI app to mount on FastAPI
socket_app = socketio.ASGIApp(sio)


@sio.event
async def connect(sid, environ, auth=None):
    """Handle new WebSocket connection."""
    logger.info(f"Socket connected: {sid}")

    user_id = None
    if auth and isinstance(auth, dict):
        token = auth.get("token")
        if token:
            try:
                from api.utils.security import decode_token
                payload = decode_token(token)
                user_id = payload.get("sub")
            except Exception:
                pass

    if user_id:
        register_connection(user_id, sid)
        await sio.emit("user_online", {"userId": user_id})
        logger.info(f"User {user_id} connected via WebSocket")


@sio.event
async def disconnect(sid):
    """Handle WebSocket disconnection."""
    unregister_connection(sid)
    logger.info(f"Socket disconnected: {sid}")


@sio.event
async def send_message(sid, data):
    """Handle send_message event from client."""
    await handle_chat_message(sio, sid, data)


@sio.event
async def typing(sid, data):
    """Handle typing event."""
    await handle_typing_indicator(sio, sid, data)


@sio.event
async def read_receipt(sid, data):
    """Handle read receipt event."""
    await handle_read_receipt(sio, sid, data)
