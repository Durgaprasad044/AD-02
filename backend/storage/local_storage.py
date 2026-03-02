"""Local file storage — dev-only fallback."""

import os
import uuid

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "tmp", "uploads")


def save_file(file_bytes: bytes, filename: str) -> str:
    """Save file locally and return path-based URL."""
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    ext = os.path.splitext(filename)[1] if filename else ".bin"
    stored_name = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(UPLOAD_DIR, stored_name)

    with open(filepath, "wb") as f:
        f.write(file_bytes)

    return f"/static/uploads/{stored_name}"


def delete_file(filename: str):
    """Delete a locally stored file."""
    filepath = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(filepath):
        os.remove(filepath)
