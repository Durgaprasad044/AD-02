"""Shared event bus for inter-agent communication."""

import asyncio
import logging
from collections import defaultdict
from typing import Any, Callable, Dict, List

logger = logging.getLogger(__name__)

_handlers: Dict[str, List[Callable]] = defaultdict(list)


def subscribe(event_type: str, handler: Callable):
    """Subscribe a handler to an event type."""
    _handlers[event_type].append(handler)
    logger.debug(f"Subscribed to {event_type}: {handler.__name__}")


async def publish(event_type: str, payload: Any = None):
    """Publish an event to all subscribed handlers."""
    handlers = _handlers.get(event_type, [])
    for handler in handlers:
        try:
            if asyncio.iscoroutinefunction(handler):
                await handler(payload)
            else:
                handler(payload)
        except Exception as e:
            logger.error(f"Event handler error for {event_type}: {e}")
