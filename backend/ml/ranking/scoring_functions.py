"""Pure scoring functions — no external dependencies."""

import math
from typing import List


def cosine_similarity(a: List[float], b: List[float]) -> float:
    """Compute cosine similarity between two vectors."""
    if len(a) != len(b) or len(a) == 0:
        return 0.0

    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))

    if norm_a == 0 or norm_b == 0:
        return 0.0

    return dot / (norm_a * norm_b)


def weighted_score(similarity: float, availability_match: bool = True,
                   goals_overlap: float = 0.0) -> float:
    """
    Produce a final compatibility score (0–100).
    Weights: similarity 60%, availability 15%, goals 25%.
    """
    score = similarity * 60.0
    if availability_match:
        score += 15.0
    score += goals_overlap * 25.0
    return min(100.0, max(0.0, score))


def normalize_scores(scores: List[float]) -> List[float]:
    """Normalize a list of scores to 0–100 range."""
    if not scores:
        return []
    min_s = min(scores)
    max_s = max(scores)
    if max_s == min_s:
        return [50.0] * len(scores)
    return [(s - min_s) / (max_s - min_s) * 100.0 for s in scores]
