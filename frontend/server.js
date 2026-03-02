import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const PORT = 4000;

// Mock Data
const posts = [
  {
    id: "1",
    content: "Just finished the hackathon! What an amazing experience building AI models.",
    createdAt: "2024-02-18T10:00:00Z",
    likes: 5,
    author: {
      id: "2",
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    }
  },
  {
    id: "2",
    content: "Anyone going to the React conference next month?",
    createdAt: "2024-02-17T15:30:00Z",
    likes: 12,
    author: {
      id: "3",
      name: "Sarah Jones",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
  }
];

const matches = [
  {
    id: "1",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "Full Stack Developer obsessed with scalable architecture.",
    skills: ["React", "Node.js", "AWS"],
    compatibilityScore: 95
  },
  {
    id: "2",
    name: "Emily White",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    bio: "UX Designer looking for a dev partner for a side project.",
    skills: ["Figma", "UI/UX", "Prototyping"],
    compatibilityScore: 88
  }
];

const conversations = [
  {
    id: "1",
    name: "David Kim",
    lastMessage: {
      content: "Hey, do you want to collaborate?"
    }
  }
];

const messages = [
  {
    id: "1",
    chatId: "1",
    senderId: "2",
    content: "Hey, do you want to collaborate?",
    createdAt: "2024-02-18T12:00:00Z"
  }
];

const me = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
  bio: "Passionate developer.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo"
};

// API Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    content: req.body.content,
    createdAt: new Date().toISOString(),
    likes: 0,
    author: me
  };
  posts.unshift(newPost);
  io.emit('post:new', newPost);
  res.json(newPost);
});

app.get('/api/matches', (req, res) => {
  res.json(matches);
});

app.post('/api/matches/:id/accept', (req, res) => {
  res.json({ success: true });
});

app.post('/api/matches/:id/reject', (req, res) => {
  res.json({ success: true });
});

app.get('/api/chats', (req, res) => {
  res.json(conversations);
});

app.get('/api/chats/:id/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/chats/:id/messages', (req, res) => {
  const msg = {
    id: Date.now().toString(),
    chatId: req.params.id,
    senderId: me.id,
    content: req.body.content,
    createdAt: new Date().toISOString()
  };
  messages.push(msg);
  // Real-time via socket
  io.emit('message:received', msg);
  res.json(msg);
});

app.get('/api/auth/me', (req, res) => {
  res.json(me);
});

app.put('/api/auth/me', (req, res) => {
  Object.assign(me, req.body);
  res.json(me);
});

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('send_message', () => {
    // Basic echo for now if needed, or handle above in HTTP
  });
});

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
