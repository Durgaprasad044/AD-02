import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';

// Lazy loaded screens
const LandingScreen = lazy(() => import('../screens/LandingScreen'));
const LoginScreen = lazy(() => import('../screens/LoginScreen'));
const DashboardScreen = lazy(() => import('../screens/DashboardScreen'));
const MatchesScreen = lazy(() => import('../screens/MatchesScreen'));
const FeedScreen = lazy(() => import('../screens/FeedScreen'));
const ChatScreen = lazy(() => import('../screens/ChatScreen'));
const ProfileScreen = lazy(() => import('../screens/ProfileScreen'));
const EventsScreen = lazy(() => import('../screens/EventsScreen'));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default function AppNavigator() {
  return (
    <Router>
      <Suspense fallback={<div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}><Loader /></div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
          <Route path="/matches" element={<ProtectedRoute><MatchesScreen /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><FeedScreen /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><EventsScreen /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
