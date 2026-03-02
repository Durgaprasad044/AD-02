# ATRIUS - AI-Driven Smart Networking Platform

**ATRIUS** is an intelligent networking platform that revolutionizes how people connect at hackathons, conferences, and professional events. Using AI-powered multi-agent architecture and semantic embeddings, ATRIUS delivers real-time, intent-based connection recommendations that eliminate the friction of traditional networking.

🚀 **[Live Demo](#)** | 📖 **[Documentation](docs/)** | 🎥 **[Video Demo](#)**

---

## 🌟 Key Features

### 🧠 **Intelligent Matching**
- **Semantic Understanding**: AI-powered embeddings understand skills, interests, and goals beyond keyword matching
- **Intent-Based Recommendations**: Matches users based on what they want to achieve (find teammates, mentors, investors)
- **Bi-Directional Compatibility**: Ensures both parties benefit from the connection

### ⚡ **Real-Time Intelligence**
- **Live Availability Tracking**: Know who's available to connect right now
- **Instant Updates**: WebSocket-powered notifications for new matches and messages
- **Event-Aware Context**: Recommendations adapt based on event schedules, tracks, and sessions

### 🎯 **Multi-Agent AI System**
- **Profile Agent**: Generates semantic embeddings from user profiles
- **Matching Agent**: Performs similarity search and compatibility scoring
- **Recommendation Agent**: Curates relevant content and user suggestions
- **Availability Agent**: Tracks real-time status and optimal contact timing
- **Feedback Agent**: Learns from user behavior to improve recommendations

### 📱 **Community Content Layer**
- Create and share tech updates, news, and insights
- Discover people through their posts and expertise
- Stay engaged beyond the event with continuous content streams

### 🔒 **Privacy & Security**
- JWT-based authentication
- Encrypted data transmission
- GDPR-compliant data handling
- User-controlled visibility settings

---

## 🎯 Problem We Solve

Traditional networking at events is:
- ❌ **Time-consuming**: Manually browsing hundreds of profiles
- ❌ **Inefficient**: Generic suggestions without context
- ❌ **Frustrating**: Missing connections due to poor timing
- ❌ **Transactional**: No ongoing value after the event

### ATRIUS Makes Networking Effortless

✅ **Smart Recommendations**: AI finds the right people instantly  
✅ **Perfect Timing**: Connect when both parties are available  
✅ **Event Context**: Leverages schedules, tracks, and location  
✅ **Lasting Value**: Community continues beyond the event  

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  Components • Screens • State Management • WebSocket         │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API + WebSocket
┌─────────────────────▼───────────────────────────────────────┐
│                  FastAPI Backend                             │
│  Authentication • Routing • Validation • Real-Time           │
└─────────┬────────────┬────────────┬──────────────────────────┘
          │            │            │
┌─────────▼─────┐ ┌────▼─────┐ ┌───▼──────────────────────────┐
│  PostgreSQL/  │ │  Redis   │ │   Multi-Agent AI System      │
│   MongoDB     │ │  Cache   │ │ ┌──────────────────────────┐ │
│               │ │          │ │ │ Profile Agent            │ │
│ User Data     │ │ Sessions │ │ │ Matching Agent           │ │
│ Profiles      │ │ Avail.   │ │ │ Recommendation Agent     │ │
│ Posts         │ │ Status   │ │ │ Availability Agent       │ │
└───────────────┘ └──────────┘ │ │ Feedback Agent           │ │
                                │ └──────────────────────────┘ │
┌───────────────────────────────┤                              │
│   Pinecone/Weaviate           │  Event Bus • Shared Memory   │
│   Vector Database             │                              │
│                               └──────────────────────────────┘
│   Profile Embeddings
│   Similarity Search
└───────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.9+
- **PostgreSQL** 14+
- **Redis** 6+
- **Pinecone** or **Weaviate** account (for vector storage)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/atrius.git
cd atrius
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys and database URLs

# Initialize database
python scripts/init_db.py

# Run migrations
alembic upgrade head

# Start the backend server
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend runs at**: `http://localhost:8000`  
**API Docs**: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with backend API URL

# Start development server
npm run dev
```

**Frontend runs at**: `http://localhost:3000`

### 4. Start Background Workers (Optional)

```bash
cd backend

# Start Celery worker
celery -A jobs.celery_app worker --loglevel=info

# Start Celery beat (scheduler)
celery -A jobs.celery_app beat --loglevel=info
```

### 5. Using Docker (Alternative)

```bash
# Start all services with Docker Compose
docker-compose up

# Services will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Grafana: http://localhost:3001
```

---

## 📁 Project Structure

```
atrius/
├── docs/                    # Documentation
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── screens/        # App screens
│   │   ├── services/       # API clients
│   │   └── store/          # Redux state
├── backend/                 # Python backend
│   ├── agents/             # Multi-agent AI system
│   ├── api/                # FastAPI routes
│   ├── database/           # Models & repositories
│   ├── vector_store/       # Embedding storage
│   ├── ml/                 # ML utilities
│   └── jobs/               # Background workers
├── infrastructure/          # Deployment configs
└── monitoring/              # Metrics & dashboards
```

See [FileStructure.md](docs/FileStructure.md) for complete project organization.

---

## 🔧 Configuration

### Environment Variables

#### Backend (`.env`)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/atrius
MONGODB_URL=mongodb://localhost:27017/atrius

# Redis
REDIS_URL=redis://localhost:6379

# Vector Database
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=us-west1-gcp

# AI/ML
OPENAI_API_KEY=your_openai_key
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Authentication
JWT_SECRET=your_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

#### Frontend (`.env`)
```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000
REACT_APP_ENV=development
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_agents/test_matching_agent.py
```

### Frontend Tests
```bash
cd frontend

# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e
```

---

## 📊 API Documentation

Once the backend is running, visit:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Create new account |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET` | `/api/profiles/me` | Get current user profile |
| `PUT` | `/api/profiles/me` | Update profile |
| `GET` | `/api/matches` | Get personalized matches |
| `POST` | `/api/matches/{id}/accept` | Accept a match |
| `GET` | `/api/feed` | Get content feed |
| `POST` | `/api/posts` | Create new post |
| `GET` | `/api/messages` | Get chat messages |
| `POST` | `/api/messages` | Send message |

See [API.md](docs/API.md) for complete API documentation.

---

## 🤖 AI Agents System

ATRIUS uses a sophisticated multi-agent architecture:

### 1. **Profile Agent**
- Generates semantic embeddings from user profiles
- Extracts skills, interests, and goals
- Maintains updated profile vectors

### 2. **Matching Agent**
- Performs similarity search across embeddings
- Calculates compatibility scores
- Ranks potential connections

### 3. **Recommendation Agent**
- Curates relevant content and posts
- Suggests users to follow
- Balances exploration vs exploitation

### 4. **Availability Agent**
- Tracks real-time user status
- Optimizes contact timing
- Manages location context

### 5. **Feedback Agent**
- Collects user behavior data
- Performs online learning
- Continuously improves matching

Read more in [Agents.md](docs/Agents.md).

---

## 🎨 Frontend Features

### Core Screens
- **🏠 Home**: Dashboard with quick actions
- **🎯 Matches**: Browse AI-recommended connections
- **📰 Feed**: Community content stream
- **💬 Chat**: Real-time messaging
- **👤 Profile**: User profile management
- **📅 Events**: Event listings and schedules

### UI Components
- **Match Cards**: Display compatibility scores and user info
- **Profile Cards**: Showcase skills and goals
- **Post Cards**: Share content and updates
- **Chat Bubbles**: Real-time messaging interface

Built with **React**, **Redux Toolkit**, and **Tailwind CSS**.

---

## 🚀 Deployment

### Production Deployment with Docker

```bash
# Build production images
docker build -f infrastructure/docker/api.Dockerfile -t atrius-api:latest .
docker build -f infrastructure/docker/websocket.Dockerfile -t atrius-ws:latest .

# Deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment

```bash
# Apply Kubernetes configurations
kubectl apply -f infrastructure/kubernetes/

# Check deployment status
kubectl get pods
kubectl get services
```

### Terraform (Cloud Infrastructure)

```bash
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan -var-file=environments/production/terraform.tfvars

# Apply infrastructure
terraform apply -var-file=environments/production/terraform.tfvars
```

---

## 📈 Monitoring & Analytics

### Metrics Dashboard

Access Grafana dashboards at `http://localhost:3001` (default credentials: admin/admin)

**Available Dashboards:**
- API Performance (response times, error rates)
- Agent Performance (matching accuracy, processing time)
- User Engagement (active users, connections made)
- System Health (CPU, memory, database metrics)

### Logging

Logs are centralized using Fluentd and stored in Elasticsearch:

```bash
# View API logs
kubectl logs -f deployment/atrius-api

# View agent logs
kubectl logs -f deployment/atrius-agents
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `pytest` (backend) and `npm test` (frontend)
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- **Python**: Follow PEP 8, use `black` for formatting
- **JavaScript**: Follow Airbnb style guide, use `prettier`
- **Commits**: Use conventional commits format

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by the ATRIUS Team

- **[Your Name]** - AI/ML Engineer - [@github](https://github.com/Durgaprasad044)
- **[Team Member 2]** - Backend Developer - [@github](https://github.com/Anjankumar-Developer)
- **[Team Member 3]** - Frontend Developer - [@github](https://github.com/Durgaprasad044)

---

## 🙏 Acknowledgments

- **Sentence-BERT** for semantic embeddings
- **Pinecone** for vector database
- **FastAPI** for modern Python APIs
- **React** community for excellent tools
- **Anthropic Claude** for documentation assistance

---

## 📞 Contact & Support

- **Email**: [seelamdurgaprasad5442@gmail.com]
- **Website**: [https://atrius.ai](#)
- **Twitter**: [@atrius_ai](#)
- **Discord**: [Join our community](#)

### Report Issues

Found a bug? [Open an issue](https://github.com/Anjankumar-Developer/AD---02-/issues)

---

## 🗺️ Roadmap

### ✅ Completed (v1.0)
- [x] Multi-agent AI architecture
- [x] Semantic profile matching
- [x] Real-time availability tracking
- [x] Community content feed
- [x] WebSocket messaging

### 🚧 In Progress (v1.1)
- [ ] Location-based matching at events
- [ ] Advanced analytics dashboard
- [ ] Mobile app (iOS/Android)
- [ ] Calendar integration

### 📋 Planned (v2.0)
- [ ] Multi-language support
- [ ] AI-powered icebreaker suggestions
- [ ] Video call integration
- [ ] Enterprise features
- [ ] Career platform expansion

---

## 💡 Use Cases

### For Hackathons
- Find teammates with complementary skills
- Discover mentors and domain experts
- Connect with judges and sponsors

### For Conferences
- Meet people attending same sessions
- Network during breaks (optimal timing)
- Follow up with content and connections

### For Professional Events
- Identify potential clients or partners
- Connect with industry peers
- Build lasting professional relationships

### For Career Platforms
- Discover job opportunities through connections
- Find mentors in your field
- Build a curated professional network

---

## 🔗 Links

- **Documentation**: [docs/](docs/)
- **Architecture Deep Dive**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **AI Agents Explained**: [docs/Agents.md](docs/Agents.md)
- **Skills Showcase**: [docs/Skills.md](docs/Skills.md)
- **Innovation Guide**: [docs/Antigravity.md](docs/Antigravity.md)

---

<div align="center">

**Made with 🚀 by ATRIUS Team**

⭐ **Star us on GitHub** if you find this project helpful!

[Website](#) • [Documentation](docs/) • [Report Bug](issues) • [Request Feature](issues)

</div>

Frontend Structure:

---

atrius-frontend/
│
├── public/
│   ├── images/
│   │   └── logo.png
│   ├── icons/
│   │   └── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.js
│   │   │   ├── Card/
│   │   │   │   ├── Card.jsx
│   │   │   │   └── index.js
│   │   │   ├── Avatar/
│   │   │   │   ├── Avatar.jsx
│   │   │   │   └── index.js
│   │   │   ├── Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── index.js
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── index.js
│   │   │   └── Loader/
│   │   │       ├── Loader.jsx
│   │   │       └── index.js
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── SkillsDisplay.jsx
│   │   │   ├── GoalsDisplay.jsx
│   │   │   └── AvailabilityStatus.jsx
│   │   │
│   │   ├── matching/
│   │   │   ├── MatchCard.jsx
│   │   │   ├── MatchList.jsx
│   │   │   └── CompatibilityScore.jsx
│   │   │
│   │   ├── feed/
│   │   │   ├── PostCard.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── FeedList.jsx
│   │   │   └── CommentSection.jsx
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatBubble.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── ChatList.jsx
│   │   │   └── ChatWindow.jsx
│   │   │
│   │   ├── events/
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventList.jsx
│   │   │   └── EventDetails.jsx
│   │   │
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Footer.jsx
│   │       └── Layout.jsx
│   │
│   ├── pages/                              # Next.js pages
│   │   ├── _app.jsx
│   │   ├── _document.jsx
│   │   ├── index.jsx                       # Landing page
│   │   │
│   │   ├── auth/
│   │   │   ├── login.jsx
│   │   │   ├── signup.jsx
│   │   │   └── onboarding.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── index.jsx
│   │   │
│   │   ├── matches/
│   │   │   ├── index.jsx
│   │   │   └── [matchId].jsx
│   │   │
│   │   ├── feed/
│   │   │   └── index.jsx
│   │   │
│   │   ├── profile/
│   │   │   ├── [userId].jsx
│   │   │   └── edit.jsx
│   │   │
│   │   ├── chat/
│   │   │   ├── index.jsx
│   │   │   └── [conversationId].jsx
│   │   │
│   │   └── events/
│   │       ├── index.jsx
│   │       └── [eventId].jsx
│   │
│   ├── services/                           # API layer
│   │   ├── api.js                         # Axios instance
│   │   ├── auth.service.js
│   │   ├── profile.service.js
│   │   ├── matching.service.js
│   │   ├── feed.service.js
│   │   ├── chat.service.js
│   │   ├── events.service.js
│   │   └── websocket.service.js
│   │
│   ├── store/                              # Redux state
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── userSlice.js
│   │       ├── matchesSlice.js
│   │       ├── feedSlice.js
│   │       ├── chatSlice.js
│   │       └── eventsSlice.js
│   │
│   ├── hooks/                              # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useMatches.js
│   │   ├── useFeed.js
│   │   ├── useChat.js
│   │   ├── useWebSocket.js
│   │   └── useDebounce.js
│   │
│   ├── utils/
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   ├── dateUtils.js
│   │   └── constants.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── theme.js
│   │
│   └── config/
│       └── routes.js
│
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── next.config.js
├── package.json
└── README.md

---

```
backend/
│
├── agents/
│   ├── profile_agent/
│   │   ├── agent.py
│   │   ├── embeddings.py
│   │   └── parser.py
│   │
│   ├── matching_agent/
│   │   ├── agent.py
│   │   ├── similarity.py
│   │   └── scoring.py
│   │
│   ├── recommendation_agent/
│   │   ├── agent.py
│   │   ├── content_ranker.py
│   │   └── user_discovery.py
│   │
│   ├── availability_agent/
│   │   ├── agent.py
│   │   └── status_manager.py
│   │
│   ├── feedback_agent/
│   │   ├── agent.py
│   │   ├── learning.py
│   │   └── analytics.py
│   │
│   └── shared/
│       ├── event_bus.py
│       └── config.py
│
├── api/
│   ├── main.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   ├── onboarding.py
│   │   ├── users.py
│   │   ├── profiles.py
│   │   ├── matches.py
│   │   ├── feed.py
│   │   ├── comments.py
│   │   ├── chat.py
│   │   ├── events.py
│   │   ├── event_rsvp.py
│   │   ├── notifications.py
│   │   ├── search.py
│   │   └── media.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── profile.py
│   │   ├── match.py
│   │   ├── post.py
│   │   ├── comment.py
│   │   ├── message.py
│   │   ├── event.py
│   │   ├── notification.py
│   │   ├── search.py
│   │   ├── media.py
│   │   └── onboarding.py
│   │
│   ├── middleware/
│   │   ├── auth.py
│   │   ├── rate_limit.py
│   │   └── cors.py
│   │
│   └── utils/
│       ├── security.py
│       ├── pagination.py
│       ├── file_upload.py
│       └── response.py
│
├── database/
│   ├── models/
│   │   ├── user.py
│   │   ├── profile.py
│   │   ├── match.py
│   │   ├── post.py
│   │   ├── comment.py
│   │   ├── message.py
│   │   ├── conversation.py
│   │   ├── event.py
│   │   ├── event_rsvp.py
│   │   ├── notification.py
│   │   └── media.py
│   │
│   ├── repositories/
│   │   ├── user_repository.py
│   │   ├── profile_repository.py
│   │   ├── match_repository.py
│   │   ├── post_repository.py
│   │   ├── comment_repository.py
│   │   ├── message_repository.py
│   │   ├── conversation_repository.py
│   │   ├── event_repository.py
│   │   ├── notification_repository.py
│   │   └── media_repository.py
│   │
│   ├── migrations/
│   │   └── versions/
│   │
│   └── connection.py
│
├── vector_store/
│   ├── pinecone_client.py
│   ├── embeddings_store.py
│   └── similarity_search.py
│
├── cache/
│   ├── redis_client.py
│   ├── availability_cache.py
│   ├── session_cache.py
│   ├── feed_cache.py
│   └── notification_cache.py
│
├── websocket/
│   ├── server.py
│   ├── handlers.py
│   ├── broadcast.py
│   └── events.py
│
├── storage/
│   ├── s3_client.py
│   ├── cloudinary_client.py
│   └── local_storage.py
│
├── ml/
│   ├── embeddings/
│   │   ├── sentence_bert.py
│   │   └── openai_embeddings.py
│   │
│   └── ranking/
│       └── scoring_functions.py
│
├── jobs/
│   ├── celery_app.py
│   └── tasks/
│       ├── embedding_generation.py
│       ├── match_refresh.py
│       ├── email_notifications.py
│       ├── push_notifications.py
│       └── media_processing.py
│
├── config/
│   └── settings.py
│
├── tests/
│   ├── conftest.py
│   ├── unit/
│   │   ├── test_auth.py
│   │   ├── test_profiles.py
│   │   ├── test_matches.py
│   │   ├── test_feed.py
│   │   ├── test_chat.py
│   │   ├── test_events.py
│   │   └── test_notifications.py
│   │
│   ├── integration/
│   │   ├── test_api_routes.py
│   │   ├── test_websocket.py
│   │   └── test_agents.py
│   │
│   └── fixtures/
│       └── sample_data.py
│
├── requirements.txt
├── requirements-dev.txt
├── .env.example
├── alembic.ini
└── Dockerfile
```
Automated Tests
Run backend unit tests: cd backend && python -m pytest tests/unit/ -v
Run backend integration tests: cd backend && python -m pytest tests/integration/ -v
Start backend and test health: cd backend && python -m uvicorn api.main:app --port 8000 then curl http://localhost:8000/api/health
Manual Verification
Start the backend: cd backend && pip install -r requirements.txt && python -m uvicorn api.main:app --reload --port 8000
Update 
frontend/.env
 to port 8000
Start the frontend: cd frontend && npm run dev
Test Auth flow: Register → Login → see profile loaded
Test Feed: Create a post → see it appear
Test Matches: View matches list
Test Chat: Open a conversation → send a message
Verify WebSocket events in browser DevTools (Network → WS tab)


cd backend
pip install -r requirements.txt
python -m uvicorn api.main:app --reload --port 8000


cd frontend
npm run dev
