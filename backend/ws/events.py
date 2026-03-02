"""WebSocket event type constants."""

# Chat events
NEW_MESSAGE = "message:received"
TYPING = "typing:start"
READ_RECEIPT = "read_receipt"

# Notification events
NEW_NOTIFICATION = "new_notification"

# Match events
MATCH_UPDATE = "match:update"

# Availability events
AVAILABILITY_CHANGE = "availability:change"

# Post events
NEW_POST = "post:new"

# User presence
USER_ONLINE = "user_online"
USER_OFFLINE = "user_offline"
