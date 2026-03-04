// Re-export useAuth from AuthContext so all existing importers of useAuthUser
// automatically share the single Firebase subscription created by <AuthProvider>.
export { useAuth as default } from '../context/AuthContext';
