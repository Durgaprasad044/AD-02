import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

// Firebase config values are read from Vite environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyAgelu6DTYrjMpfGpQVRfhK29ABTD0tJV8",
  authDomain: "ad-02-b228e.firebaseapp.com",
  projectId: "ad-02-b228e",
  storageBucket: "ad-02-b228e.firebasestorage.app",
  messagingSenderId: "639133696901",
  appId: "1:639133696901:web:a97d3d668fc31b8e943aec",
  measurementId: "G-6SVWRT1W0X"
};

// Initialize Firebase app (singleton)
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const firebaseAuth = getAuth(app);

// Explicitly set LOCAL persistence so that:
// 1. Sessions survive hard page refreshes (read from IndexedDB/localStorage)
// 2. onAuthStateChanged reliably fires with the stored user on every app mount
setPersistence(firebaseAuth, browserLocalPersistence).catch((err) => {
  console.error('[Firebase] Failed to set auth persistence:', err);
});

export default app;
