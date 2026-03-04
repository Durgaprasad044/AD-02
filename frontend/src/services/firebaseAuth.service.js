import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebaseConfig';

// Email/password sign in
export const firebaseEmailLogin = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const user = userCredential.user;
  const idToken = await user.getIdToken();

  return {
    user,
    idToken,
  };
};

// Email/password registration
export const firebaseEmailRegister = async ({ email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  const user = userCredential.user;
  const idToken = await user.getIdToken();

  return {
    user,
    idToken,
  };
};

// Google sign-in with popup
export const firebaseGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  // Always show account selection, even if a user is already signed in
  provider.setCustomParameters({ prompt: 'select_account' });

  const result = await signInWithPopup(firebaseAuth, provider);
  const user = result.user;
  const idToken = await user.getIdToken();

  return {
    user,
    idToken,
  };
};

// Sign out
export const firebaseLogout = () => signOut(firebaseAuth);

// Subscribe to auth state changes (e.g., in a React effect)
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(firebaseAuth, callback);
};

export default {
  firebaseEmailLogin,
  firebaseEmailRegister,
  firebaseGoogleLogin,
  firebaseLogout,
  subscribeToAuthChanges,
};

