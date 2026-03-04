import { onAuthStateChanged as firebaseOnAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { firebaseAuth } from './firebaseConfig';

// Re-export the auth instance so the rest of the app has a single source of truth.
export const auth = firebaseAuth;

// Subscribe to auth state changes.
export const onAuthStateChanged = (callback) => firebaseOnAuthStateChanged(auth, callback);

// Sign out the currently logged-in user.
export const signOut = () => firebaseSignOut(auth);

export default {
  auth,
  onAuthStateChanged,
  signOut,
};

