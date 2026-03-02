"""Feedback agent — routes feedback to learning and analytics."""

import logging
from agents.feedback_agent.learning import update_preferences
from agents.feedback_agent.analytics import record_feedback
from agents.shared.event_bus import subscribe

logger = logging.getLogger(__name__)


async def handle_feedback(payload: dict):
    """Handle feedback events (match accept/reject, post like)."""
    user_id = payload.get("user_id")
    feedback_type = payload.get("type")  # "match_accepted", "match_rejected", "post_liked"
    target_id = payload.get("target_id")

    if user_id:
        await update_preferences(user_id, feedback_type, target_id)
        await record_feedback(user_id, feedback_type, target_id)
        logger.info(f"Feedback processed: {feedback_type} by {user_id}")


subscribe("feedback:received", handle_feedback)
