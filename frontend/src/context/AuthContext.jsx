import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from '../firebase/auth';
import { getUserProfile, createUserProfile } from '../firebase/firestore';

const AuthContext = createContext(null);

/**
 * AuthProvider — subscribes to Firebase onAuthStateChanged ONCE at the app root.
 *
 * React.StrictMode in development double-invokes effects (mount → unmount → mount).
 * We guard against this with a `mounted` ref so a stale unsubscribe from the first
 * mount cycle never clears state that the second mount has already set.
 */
export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(undefined); // undefined = not yet resolved
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tracks whether the current effect instance is still alive.
  // Prevents StrictMode's cleanup/remount cycle from corrupting state.
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    const unsubscribe = onAuthStateChanged(async (user) => {
      // Guard: ignore callbacks from a cleanup cycle
      if (!mountedRef.current) return;

      try {
        if (!user) {
          setFirebaseUser(null);
          setProfile(null);
          setProfileLoading(false);
          return;
        }

        // User is known — mark auth as resolved immediately so routes unblock.
        setFirebaseUser(user);
        setProfileLoading(true);

        let existingProfile = await getUserProfile(user.uid);
        if (!existingProfile) {
          existingProfile = await createUserProfile(user);
        }

        if (mountedRef.current) {
          setProfile(existingProfile);
        }
      } catch (err) {
        console.error('[AuthContext] Failed to load user profile:', err);
        if (mountedRef.current) setError(err);
      } finally {
        if (mountedRef.current) setProfileLoading(false);
      }
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, []);

  // `loading` is true ONLY while the very first Firebase auth check is in flight.
  // Once firebaseUser is set to null (no user) or a User object, loading is done.
  const loading = firebaseUser === undefined;

  const value = {
    firebaseUser: firebaseUser ?? null,
    profile,
    loading,
    profileLoading,
    error,
    isAuthenticated: !!firebaseUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — consume the shared auth context.
 * Throws if used outside of <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

export default AuthContext;
