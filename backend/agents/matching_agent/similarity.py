"""Cosine similarity computations."""

from typing import List
from ml.ranking.scoring_functions import cosine_similarity


def batch_cosine_similarity(query: List[float],
                             candidates: List[List[float]]) -> List[float]:
    """Compute cosine similarity of query against a batch of candidates."""
    return [cosine_similarity(query, c) for c in candidates]
