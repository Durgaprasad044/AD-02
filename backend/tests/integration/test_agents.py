"""Integration tests for agents."""
import pytest
from ml.ranking.scoring_functions import cosine_similarity, weighted_score

def test_cosine_similarity():
    a = [1.0, 0.0, 0.0]
    b = [1.0, 0.0, 0.0]
    assert cosine_similarity(a, b) == pytest.approx(1.0)

def test_cosine_similarity_orthogonal():
    a = [1.0, 0.0]
    b = [0.0, 1.0]
    assert cosine_similarity(a, b) == pytest.approx(0.0)

def test_weighted_score():
    score = weighted_score(0.8, True, 0.5)
    assert 0 <= score <= 100
