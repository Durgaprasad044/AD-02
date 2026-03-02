# Backend File Descriptions & Coding Prompts

> Use these descriptions as prompts when writing code for each file.

---

## agents/

### profile_agent/
| File | Description / Prompt |
|------|----------------------|
| `agent.py` | Main orchestrator for the profile agent. Receives raw user input, calls `parser.py` to extract structured data, then calls `embeddings.py` to generate a vector. Exposes a single `run(user_id, input_data)` async function. |
| `embeddings.py` | Takes a structured profile dict and generates a vector embedding using SentenceBERT or OpenAI. Returns a list of floats. Calls `ml/embeddings/` utilities. |
| `parser.py` | Parses raw user signup/onboarding text into structured fields: name, skills, goals, availability, bio. Returns a Pydantic-like dict. |

### matching_agent/
| File | Description / Prompt |
|------|----------------------|
| `agent.py` | Orchestrates the matching pipeline. Given a user_id, fetches their embedding, queries the vector store, runs scoring, and returns a ranked list of candidate user IDs. |
| `similarity.py` | Computes cosine similarity between two embedding vectors. Also supports batch similarity computation for a list of candidates. |
| `scoring.py` | Takes similarity scores and adds weighted signals (availability, goals overlap, skills match) to produce a final compatibility score (0–100). |

### recommendation_agent/
| File | Description / Prompt |
|------|----------------------|
| `agent.py` | Orchestrates content and user recommendations for a given user. Calls `content_ranker.py` for posts and `user_discovery.py` for people suggestions. |
| `content_ranker.py` | Ranks a list of posts by relevance to the user's profile embedding. Uses dot product or cosine similarity against post embeddings. Returns sorted post IDs. |
| `user_discovery.py` | Suggests new users to follow based on mutual skills, goals, and network. Queries vector store and filters out existing matches/connections. |

### availability_agent/
| File | Description / Prompt |
|------|----------------------|
| `agent.py` | Listens for availability update events from the event bus. Calls `status_manager.py` to persist and broadcast changes. |
| `status_manager.py` | Reads/writes user availability status to Redis cache. Provides `set_status(user_id, status)` and `get_status(user_id)` methods. |

### feedback_agent/
| File | Description / Prompt |
|------|----------------------|
| `agent.py` | Receives feedback events (match accepted/rejected, post liked). Routes to `learning.py` and `analytics.py`. |
| `learning.py` | Updates user preference weights based on feedback signals. Implements simple online learning (e.g., weight decay on rejected matches). |
| `analytics.py` | Aggregates feedback patterns per user over time. Computes engagement scores and surfaces trends for improving recommendations. |

### shared/
| File | Description / Prompt |
|------|----------------------|
| `event_bus.py` | Simple in-process or Redis pub/sub event bus. Provides `publish(event_type, payload)` and `subscribe(event_type, handler)`. Used for inter-agent communication. |
| `config.py` | Shared agent configuration constants: model names, thresholds, weights for scoring, batch sizes. Loaded from environment variables. |

---

## api/

### `main.py`
FastAPI app entry point. Creates the app instance, registers all routers with prefixes (`/auth`, `/profiles`, `/matches`, etc.), adds middleware (CORS, rate limit, auth), and starts the server with Uvicorn.

### routes/
| File | Description / Prompt |
|------|----------------------|
| `auth.py` | Handles `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh-token`. Uses `security.py` for hashing and JWT creation. Returns access + refresh tokens. |
| `onboarding.py` | Handles `POST /onboarding/complete` (save onboarding data) and `GET /onboarding/status` (check if user has completed onboarding). Calls profile agent after completion. |
| `users.py` | Handles `GET /users/{userId}` for public profile viewing. Returns only public fields. Different from `/profiles` which is for the authenticated user's own profile. |
| `profiles.py` | Handles `GET /profiles/me` and `PUT /profiles/me` for the logged-in user to view and update their own profile. Triggers embedding regeneration on update. |
| `matches.py` | Handles `GET /matches` (fetch ranked matches), `POST /matches/accept`, `POST /matches/reject`. Fires feedback events on accept/reject. |
| `feed.py` | Handles `GET /feed` (paginated post feed), `POST /posts` (create post), `GET /posts/{id}`, `DELETE /posts/{id}`. |
| `comments.py` | Handles `GET /posts/{id}/comments`, `POST /posts/{id}/comments`, `DELETE /comments/{id}`. |
| `chat.py` | Handles `GET /conversations`, `GET /conversations/{id}/messages`, `POST /conversations/{id}/messages`. Triggers WebSocket broadcast on new message. |
| `events.py` | Handles `GET /events` (list events with filters), `POST /events` (create event), `GET /events/{id}`. |
| `event_rsvp.py` | Handles `POST /events/{id}/rsvp` (join event) and `DELETE /events/{id}/rsvp` (leave event). Updates attendee count. |
| `notifications.py` | Handles `GET /notifications` (paginated), `PUT /notifications/read` (mark all read), `PUT /notifications/{id}/read` (mark one read). |
| `search.py` | Handles `GET /search?q=&type=` where type is users/posts/events. Queries DB and vector store depending on type. |
| `media.py` | Handles `POST /upload` (multipart form). Validates file type/size, uploads to S3/Cloudinary, returns public URL. |

### models/
| File | Description / Prompt |
|------|----------------------|
| `user.py` | Pydantic schemas: `UserBase`, `UserCreate`, `UserResponse` (public fields only), `UserPrivateResponse` (includes email). |
| `profile.py` | Pydantic schemas: `ProfileUpdate` (request), `ProfileResponse` (response with skills, goals, availability, bio, avatar_url). |
| `match.py` | Pydantic schemas: `MatchResponse` (matched user info + compatibility_score), `MatchActionRequest` (accept/reject). |
| `post.py` | Pydantic schemas: `PostCreate` (content, media_url), `PostResponse` (includes author info, like_count, comment_count). |
| `comment.py` | Pydantic schemas: `CommentCreate` (content), `CommentResponse` (includes author info, created_at). |
| `message.py` | Pydantic schemas: `MessageCreate` (content, media_url), `MessageResponse` (includes sender info, read status, timestamp). |
| `event.py` | Pydantic schemas: `EventCreate` (title, description, date, location, capacity), `EventResponse` (includes attendee_count, is_attending). |
| `notification.py` | Pydantic schemas: `NotificationResponse` (type, message, reference_id, reference_type, is_read, created_at). |
| `search.py` | Pydantic schemas: `SearchQuery` (q, type, page, limit), `SearchResult` (hits list, total, type). |
| `media.py` | Pydantic schemas: `MediaUploadResponse` (url, public_id, media_type, size). |
| `onboarding.py` | Pydantic schemas: `OnboardingData` (skills, goals, availability, bio, interests), `OnboardingStatusResponse` (is_complete, step). |

### middleware/
| File | Description / Prompt |
|------|----------------------|
| `auth.py` | JWT middleware. Extracts Bearer token from Authorization header, verifies it, attaches `request.state.user_id`. Returns 401 if invalid. |
| `rate_limit.py` | Redis-backed rate limiter. Limits requests per IP/user per time window. Returns 429 with retry-after header when exceeded. |
| `cors.py` | Configures CORS: allowed origins (frontend URL), allowed methods, headers, credentials. Reads origin from environment variables. |

### utils/
| File | Description / Prompt |
|------|----------------------|
| `security.py` | `hash_password(plain)`, `verify_password(plain, hashed)` using bcrypt. `create_access_token(user_id)`, `create_refresh_token(user_id)`, `decode_token(token)` using PyJWT. |
| `pagination.py` | Provides `PaginationParams` (page, limit) as a FastAPI dependency. Returns `paginate(query, page, limit)` helper that returns items + total + has_next. |
| `file_upload.py` | Validates uploaded file (allowed types: jpg/png/webp/mp4, max size). Calls `storage/` client to upload. Returns CDN URL. |
| `response.py` | Standardized response wrapper: `success_response(data, message)` and `error_response(message, code)`. Ensures consistent JSON envelope across all routes. |

---

## database/

### models/
| File | Description / Prompt |
|------|----------------------|
| `user.py` | SQLAlchemy model for `users` table. Fields: id, email, password_hash, is_active, is_verified, created_at, updated_at. |
| `profile.py` | SQLAlchemy model for `profiles` table. Fields: user_id (FK), display_name, bio, avatar_url, skills (JSON), goals (JSON), availability, embedding_id, updated_at. |
| `match.py` | SQLAlchemy model for `matches` table. Fields: id, user_id_1, user_id_2, status (pending/accepted/rejected), compatibility_score, created_at. |
| `post.py` | SQLAlchemy model for `posts` table. Fields: id, author_id (FK), content, media_url, like_count, comment_count, created_at, updated_at. |
| `comment.py` | SQLAlchemy model for `comments` table. Fields: id, post_id (FK), author_id (FK), content, created_at. |
| `message.py` | SQLAlchemy model for `messages` table. Fields: id, conversation_id (FK), sender_id (FK), content, media_url, is_read, created_at. |
| `conversation.py` | SQLAlchemy model for `conversations` table. Fields: id, participant_1_id, participant_2_id, last_message_at, created_at. |
| `event.py` | SQLAlchemy model for `events` table. Fields: id, creator_id (FK), title, description, event_date, location, capacity, attendee_count, created_at. |
| `event_rsvp.py` | SQLAlchemy model for `event_rsvps` table. Fields: id, event_id (FK), user_id (FK), created_at. Unique constraint on (event_id, user_id). |
| `notification.py` | SQLAlchemy model for `notifications` table. Fields: id, user_id (FK), type, message, reference_id, reference_type, is_read, created_at. |
| `media.py` | SQLAlchemy model for `media` table. Fields: id, uploader_id (FK), url, public_id, media_type, size_bytes, created_at. |

### repositories/
| File | Description / Prompt |
|------|----------------------|
| `user_repository.py` | `create_user`, `get_by_id`, `get_by_email`, `update_user`, `delete_user`. All async, takes DB session as dependency. |
| `profile_repository.py` | `create_profile`, `get_by_user_id`, `update_profile`, `get_profiles_by_ids`. Supports partial updates. |
| `match_repository.py` | `create_match`, `get_matches_for_user`, `update_match_status`, `get_match_by_user_pair`. Filters by status. |
| `post_repository.py` | `create_post`, `get_feed_posts` (paginated), `get_by_id`, `delete_post`, `increment_like_count`, `increment_comment_count`. |
| `comment_repository.py` | `create_comment`, `get_comments_by_post` (paginated), `delete_comment`, `get_by_id`. |
| `message_repository.py` | `create_message`, `get_messages_by_conversation` (paginated), `mark_as_read`, `get_unread_count`. |
| `conversation_repository.py` | `create_conversation`, `get_by_participants`, `get_conversations_for_user`, `update_last_message_at`. |
| `event_repository.py` | `create_event`, `get_events` (paginated, filterable), `get_by_id`, `update_attendee_count`, `delete_event`. |
| `notification_repository.py` | `create_notification`, `get_for_user` (paginated), `mark_read`, `mark_all_read`, `get_unread_count`. |
| `media_repository.py` | `create_media_record`, `get_by_id`, `get_by_uploader`, `delete_media_record`. |

### `connection.py`
Creates async SQLAlchemy engine and session factory from `DATABASE_URL` env var. Exports `get_db()` as a FastAPI dependency that yields a session and handles commit/rollback.

---

## vector_store/
| File | Description / Prompt |
|------|----------------------|
| `pinecone_client.py` | Initializes Pinecone client with API key and index name from env. Provides `get_index()` helper. |
| `embeddings_store.py` | `upsert_embedding(user_id, vector, metadata)` and `delete_embedding(user_id)`. Wraps Pinecone upsert/delete. |
| `similarity_search.py` | `search_similar(vector, top_k, filter)` — queries Pinecone and returns list of `{id, score}` dicts. Supports metadata filters (e.g., availability). |

---

## cache/
| File | Description / Prompt |
|------|----------------------|
| `redis_client.py` | Creates Redis connection pool from `REDIS_URL` env var. Exports `get_redis()` async context manager. |
| `availability_cache.py` | `set_availability(user_id, status, ttl)` and `get_availability(user_id)`. Keys: `availability:{user_id}`. |
| `session_cache.py` | `store_session(token, user_id, ttl)` and `get_session(token)` and `invalidate_session(token)`. Blacklists revoked tokens. |
| `feed_cache.py` | `cache_feed(user_id, posts, ttl)` and `get_cached_feed(user_id)`. Caches serialized post list per user. Invalidated on new post creation. |
| `notification_cache.py` | `get_unread_count(user_id)`, `increment_unread(user_id)`, `reset_unread(user_id)`. Keys: `notif_count:{user_id}`. |

---

## websocket/
| File | Description / Prompt |
|------|----------------------|
| `server.py` | Sets up WebSocket server with FastAPI. Manages a connection registry `{user_id: WebSocket}`. Handles connect/disconnect lifecycle. |
| `handlers.py` | Routes incoming WebSocket messages to correct handler by event type: `chat_message`, `typing_indicator`, `read_receipt`. |
| `broadcast.py` | `send_to_user(user_id, event_type, payload)` — looks up connection registry and sends JSON. Falls back gracefully if user is offline. |
| `events.py` | Constants for all WebSocket event types: `NEW_MESSAGE`, `TYPING`, `READ_RECEIPT`, `NEW_NOTIFICATION`, `MATCH_UPDATE`, `AVAILABILITY_CHANGE`. |

---

## storage/
| File | Description / Prompt |
|------|----------------------|
| `s3_client.py` | Initializes boto3 S3 client. Provides `upload_file(file_bytes, key, content_type)` and `delete_file(key)`. Returns public URL. |
| `cloudinary_client.py` | Initializes Cloudinary SDK. Provides `upload_image(file_bytes, folder, transformations)` for resizing/compressing on upload. Returns CDN URL. |
| `local_storage.py` | Dev-only fallback. Saves files to `/tmp/uploads/`. Provides same interface as S3/Cloudinary clients. Used when `STORAGE_BACKEND=local`. |

---

## ml/

### embeddings/
| File | Description / Prompt |
|------|----------------------|
| `sentence_bert.py` | Loads a SentenceBERT model (`all-MiniLM-L6-v2`). Provides `encode(text)` → list of floats. Caches model at module load time. |
| `openai_embeddings.py` | Calls OpenAI `text-embedding-ada-002` API. Provides `embed(text)` → list of floats. Handles retries and rate limits. |

### ranking/
| File | Description / Prompt |
|------|----------------------|
| `scoring_functions.py` | Pure functions: `cosine_similarity(a, b)`, `weighted_score(similarity, availability_match, goals_overlap)`, `normalize_scores(scores_list)`. No external dependencies. |

---

## jobs/
| File | Description / Prompt |
|------|----------------------|
| `celery_app.py` | Creates Celery app with Redis as broker and result backend. Configures task serialization, timezone, and beat schedule for periodic tasks. |
| `tasks/embedding_generation.py` | Celery task: takes a list of user_ids, generates embeddings in batch, upserts to Pinecone. Triggered after bulk signup or profile update. |
| `tasks/match_refresh.py` | Periodic Celery beat task. Refreshes match candidates for active users by re-running the matching agent. Runs daily. |
| `tasks/email_notifications.py` | Celery task: sends transactional emails (welcome, match notification, event reminder) via SendGrid or SMTP. Accepts template_id + recipient + context. |
| `tasks/push_notifications.py` | Celery task: sends mobile push notifications via Firebase Cloud Messaging (FCM). Accepts device_token + title + body + data. |
| `tasks/media_processing.py` | Celery task: resizes and compresses uploaded images to standard sizes (thumbnail, medium, large). Replaces original in storage with processed versions. |

---

## config/
| File | Description / Prompt |
|------|----------------------|
| `settings.py` | Pydantic `BaseSettings` class. Loads all env vars: `DATABASE_URL`, `REDIS_URL`, `PINECONE_API_KEY`, `JWT_SECRET`, `AWS_*`, `OPENAI_API_KEY`, `STORAGE_BACKEND`, `FRONTEND_URL`, etc. Singleton `get_settings()`. |

---

## tests/
| File | Description / Prompt |
|------|----------------------|
| `conftest.py` | Pytest fixtures: async DB session, test client, mock Redis, seed users. Sets `DATABASE_URL` to SQLite in-memory for tests. |
| `fixtures/sample_data.py` | Factory functions to create test users, profiles, posts, events with realistic fake data using `faker`. |
| `unit/test_auth.py` | Tests for signup, login, token refresh, logout. Mocks DB. Checks token generation and password hashing. |
| `unit/test_profiles.py` | Tests for profile create/read/update. Verifies embedding is triggered on update. |
| `unit/test_matches.py` | Tests for match retrieval, accept, reject. Verifies compatibility scores are returned. |
| `unit/test_feed.py` | Tests for post creation, feed pagination, like count increment. |
| `unit/test_chat.py` | Tests for conversation creation, message sending, read receipts. |
| `unit/test_events.py` | Tests for event creation, RSVP join/leave, attendee count accuracy. |
| `unit/test_notifications.py` | Tests for notification creation, mark-read, unread count via cache. |
| `integration/test_api_routes.py` | End-to-end route tests using TestClient. Covers auth → profile → match flow with real DB. |
| `integration/test_websocket.py` | Tests WebSocket connect, message send, and broadcast using `starlette.testclient`. |
| `integration/test_agents.py` | Tests full agent pipelines: profile agent parses → embeds → stores, matching agent queries → scores → returns candidates. |

---

## Root Files
| File | Description / Prompt |
|------|----------------------|
| `requirements.txt` | Production Python dependencies: fastapi, uvicorn, sqlalchemy, alembic, redis, celery, pinecone-client, sentence-transformers, openai, boto3, cloudinary, pyjwt, bcrypt, pydantic-settings. |
| `requirements-dev.txt` | Dev/test dependencies: pytest, pytest-asyncio, httpx, faker, pytest-cov, black, ruff. |
| `.env.example` | Template with all required env vars and example values. No real secrets. |
| `alembic.ini` | Alembic config pointing to `database/migrations/`. Sets `sqlalchemy.url` from env. |
| `Dockerfile` | Multi-stage build: install deps → copy source → expose port 8000 → run uvicorn with `main:app`. |