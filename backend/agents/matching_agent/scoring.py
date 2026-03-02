"""Scoring — add weighted signals to similarity scores."""

from typing import List
from ml.ranking.scoring_functions import weighted_score


def compute_final_scores(candidates: List[dict],
                          user_profile: dict) -> List[dict]:
    """
    Takes similarity-scored candidates and adds weighted signals.
    Returns sorted list of { user_id, compatibility_score }.
    """
    results = []
    for candidate in candidates:
        similarity = candidate.get("score", 0.0)
        # Basic availability match (assume available if unknown)
        avail_match = True
        # Goals overlap placeholder
        goals_overlap = 0.5

        final = weighted_score(similarity, avail_match, goals_overlap)
        results.append({
            "user_id": candidate["id"],
            "compatibility_score": round(final, 1),
        })

    results.sort(key=lambda x: x["compatibility_score"], reverse=True)
    return results
