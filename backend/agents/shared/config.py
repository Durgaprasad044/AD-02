"""Shared agent configuration constants."""

import os

# Embedding model
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "sentence-transformers")

# Matching thresholds
MIN_SIMILARITY_THRESHOLD = 0.3
MAX_MATCHES_PER_USER = 20

# Scoring weights
SIMILARITY_WEIGHT = 0.6
AVAILABILITY_WEIGHT = 0.15
GOALS_WEIGHT = 0.25

# Batch sizes
EMBEDDING_BATCH_SIZE = 50
MATCH_REFRESH_BATCH_SIZE = 100

# Recommendation
MAX_RECOMMENDATIONS = 10
CONTENT_RANK_LIMIT = 50
