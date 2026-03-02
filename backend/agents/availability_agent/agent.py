"""Availability agent — handles availability update events."""

import logging
from agents.availability_agent.status_manager import set_status, get_status
from agents.shared.event_bus import subscribe

logger = logging.getLogger(__name__)


async def handle_availability_update(payload: dict):
    """Handle an availability update event."""
    user_id = payload.get("user_id")
    status = payload.get("status", "available")

    if user_id:
        await set_status(user_id, status)
        logger.info(f"Updated availability for {user_id}: {status}")


# Subscribe to events on module load
subscribe("availability:update", handle_availability_update)
