"""Profile agent — orchestrates profile processing."""

import logging
from agents.profile_agent.parser import parse_profile_input
from agents.profile_agent.embeddings import generate_embedding
from vector_store.embeddings_store import upsert_embedding

logger = logging.getLogger(__name__)


async def run(user_id: str, input_data: dict) -> dict:
    """
    Process profile input: parse -> embed -> store.
    Returns structured profile data.
    """
    # Parse raw input into structured fields
    structured = parse_profile_input(input_data)

    # Generate embedding vector
    vector = generate_embedding(structured)

    # Store in vector DB
    metadata = {
        "skills": ",".join(structured.get("skills", [])),
        "goals": ",".join(structured.get("goals", [])),
        "availability": structured.get("availability", "available"),
    }
    await upsert_embedding(user_id, vector, metadata)

    logger.info(f"Profile agent processed user {user_id}")
    return structured
