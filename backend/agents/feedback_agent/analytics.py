"""Analytics — aggregate feedback patterns."""

import logging
from collections import defaultdict

logger = logging.getLogger(__name__)

_analytics: dict = defaultdict(lambda: {"total": 0, "accepted": 0, "rejected": 0, "liked": 0})


async def record_feedback(user_id: str, feedback_type: str, target_id: str):
    """Record feedback event for analytics."""
    data = _analytics[user_id]
    data["total"] += 1

    if feedback_type == "match_accepted":
        data["accepted"] += 1
    elif feedback_type == "match_rejected":
        data["rejected"] += 1
    elif feedback_type == "post_liked":
        data["liked"] += 1


def get_engagement_score(user_id: str) -> float:
    """Compute engagement score for a user."""
    data = _analytics.get(user_id)
    if not data or data["total"] == 0:
        return 50.0
    positive = data["accepted"] + data["liked"]
    return min(100.0, (positive / data["total"]) * 100)
