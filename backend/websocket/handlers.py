"""WebSocket message handlers."""

import logging

logger = logging.getLogger(__name__)


async def handle_chat_message(sio, sid, data):
    """Handle incoming chat message via WebSocket."""
    logger.info(f"Chat message from {sid}: {data}")
    # The actual message saving is done via HTTP API
    # This just handles real-time broadcast if needed


async def handle_typing_indicator(sio, sid, data):
    """Handle typing indicator."""
    from websocket.broadcast import send_to_user
    target_user = data.get("to")
    if target_user:
        await send_to_user(sio, target_user, "typing:start", {
            "from": data.get("from", sid),
            "chatId": data.get("chatId"),
        })


async def handle_read_receipt(sio, sid, data):
    """Handle read receipt."""
    from websocket.broadcast import send_to_user
    target_user = data.get("to")
    if target_user:
        await send_to_user(sio, target_user, "read_receipt", {
            "chatId": data.get("chatId"),
            "readBy": data.get("from", sid),
        })
