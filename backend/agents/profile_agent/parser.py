"""Profile input parser."""

from typing import List, Optional


def parse_profile_input(input_data: dict) -> dict:
    """
    Parse raw user input into structured profile fields.
    Returns dict with: name, skills, goals, availability, bio, interests.
    """
    return {
        "name": input_data.get("name") or input_data.get("display_name", ""),
        "skills": _parse_list(input_data.get("skills", [])),
        "goals": _parse_list(input_data.get("goals", [])),
        "availability": input_data.get("availability", "available"),
        "bio": input_data.get("bio", ""),
        "interests": _parse_list(input_data.get("interests", [])),
    }


def _parse_list(value) -> List[str]:
    """Parse a value into a list of strings."""
    if isinstance(value, list):
        return [str(v).strip() for v in value if v]
    if isinstance(value, str):
        return [s.strip() for s in value.split(",") if s.strip()]
    return []
