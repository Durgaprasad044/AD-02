"""Profile embedding generation."""

from typing import List

from agents.shared.config import EMBEDDING_MODEL


def generate_embedding(profile: dict) -> List[float]:
    """Generate embedding from structured profile data."""
    # Build text representation
    parts = []
    if profile.get("bio"):
        parts.append(profile["bio"])
    if profile.get("skills"):
        parts.append("Skills: " + ", ".join(profile["skills"]))
    if profile.get("goals"):
        parts.append("Goals: " + ", ".join(profile["goals"]))

    text = ". ".join(parts) if parts else "No profile information"

    if EMBEDDING_MODEL == "openai":
        import asyncio
        from ml.embeddings.openai_embeddings import embed
        return asyncio.get_event_loop().run_until_complete(embed(text))
    else:
        from ml.embeddings.sentence_bert import encode
        return encode(text)
