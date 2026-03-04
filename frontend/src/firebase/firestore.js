import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import app from './firebaseConfig';

const db = getFirestore(app);

// User profile helpers -------------------------------------------------------

export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const ref = doc(db, 'users', uid);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { uid, ...snapshot.data() };
};

export const createUserProfile = async (user) => {
  if (!user?.uid) return null;

  const ref = doc(db, 'users', user.uid);
  const snapshot = await getDoc(ref);

  // Only create if it doesn't already exist.
  if (!snapshot.exists()) {
    const payload = {
      name: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
      company: '',
      title: '',
      skills: [],
      connections: 0,
      eventsJoined: 0,
      createdAt: serverTimestamp(),
    };

    await setDoc(ref, payload, { merge: true });
    return { uid: user.uid, ...payload };
  }

  return { uid: user.uid, ...snapshot.data() };
};

// Events ---------------------------------------------------------------------

export const getEvents = async () => {
  const eventsRef = collection(db, 'events');
  const q = query(eventsRef, orderBy('date', 'asc'), limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
};

// Posts / Network activity ---------------------------------------------------

export const getPosts = async (options = {}) => {
  const { limitCount = 5 } = options;
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('timestamp', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export default {
  getUserProfile,
  createUserProfile,
  getEvents,
  getPosts,
};

