"""Learning — update user preferences based on feedback."""

import logging
from collections import defaultdict

logger = logging.getLogger(__name__)

# In-memory preference store
_preferences: dict = defaultdict(lambda: {"weight": 1.0, "history": []})


async def update_preferences(user_id: str, feedback_type: str, target_id: str):
    """Update user preference weights based on feedback signals."""
    prefs = _preferences[user_id]

    if feedback_type == "match_rejected":
        prefs["weight"] *= 0.95  # decay
    elif feedback_type == "match_accepted":
        prefs["weight"] *= 1.05  # boost
    elif feedback_type == "post_liked":
        prefs["weight"] *= 1.02

    prefs["history"].append({"type": feedback_type, "target": target_id})

    # Keep history bounded
    if len(prefs["history"]) > 100:
        prefs["history"] = prefs["history"][-100:]
