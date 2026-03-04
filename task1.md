You are a senior full-stack engineer.

Your task is to convert my current frontend dashboard into a REAL production-level dashboard using Firebase Authentication and Firestore so the UI shows the logged-in user's actual information instead of static placeholders like "User".

IMPORTANT:
Do NOT redesign the UI.
Keep the existing design, layout, and styles exactly the same.
Only connect the UI to real data.

--------------------------------------------------

GOALS

1. Replace all static "User" placeholders with real logged-in user data.
2. Load user profile information from Firebase Authentication and Firestore.
3. Make the dashboard behave like a real professional website.

--------------------------------------------------

AUTHENTICATION REQUIREMENTS

Use Firebase Authentication.

Get the logged-in user using:

onAuthStateChanged(auth, callback)

If the user is not logged in:
redirect to /login.

If the user is logged in:
load their profile data.

--------------------------------------------------

USER DATA STRUCTURE (Firestore)

Create a Firestore collection:

users

Document ID = user.uid

Structure:

users/
   uid/
      name: string
      email: string
      photoURL: string
      company: string
      title: string
      skills: array
      connections: number
      eventsJoined: number
      createdAt: timestamp

--------------------------------------------------

DASHBOARD REQUIREMENTS

Replace static UI values with real data.

1️⃣ Header

Current:
User   [U]

Replace with:

User's name
User avatar (photoURL)

If no image:
show first letter of name.

Example:

Durga Prasad   [D]

--------------------------------------------------

2️⃣ Welcome Message

Replace

Welcome back, User

with

Welcome back, {user.name}

--------------------------------------------------

3️⃣ Smart Matches

Generate dynamic matches based on shared skills.

Example:

"We found 3 professionals matching your skills."

Use dummy data for now if backend is not implemented.

--------------------------------------------------

4️⃣ Active Event Card

Load event from Firestore:

events/
   eventId
      name
      location
      date
      opportunities

Example:

Global Tech Summit 2026
San Francisco, CA
May 15-17

--------------------------------------------------

5️⃣ Network Activity

Load posts from Firestore:

posts/
   postId
      userName
      message
      timestamp

Show the most recent post.

--------------------------------------------------

FIREBASE FILE STRUCTURE

src/
  firebase/
     firebaseConfig.js
     auth.js
     firestore.js

firebaseConfig.js

Initialize Firebase.

auth.js

Export:

auth
onAuthStateChanged
signOut

firestore.js

Functions:

getUserProfile(uid)
createUserProfile(user)
getEvents()
getPosts()

--------------------------------------------------

REACT LOGIC

Create a hook:

useAuthUser()

This should:

• detect login state
• fetch Firestore profile
• return user data

--------------------------------------------------

AVATAR LOGIC

If photoURL exists:
show profile image

Else:

show first letter of name inside avatar circle.

--------------------------------------------------

PROTECTED ROUTES

Create:

ProtectedRoute component

Behavior:

if user not authenticated → redirect /login

--------------------------------------------------

REAL WEBSITE EXPERIENCE

Implement:

• persistent login
• loading state while fetching user
• logout functionality
• clean error handling

--------------------------------------------------

OUTPUT

Provide full code for:

• Firebase config
• authentication hook
• Firestore user profile fetch
• dashboard integration
• avatar logic
• protected route

The final dashboard must display the logged-in user's real data instead of "User".