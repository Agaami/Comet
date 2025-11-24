import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  // 1. Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if route requires admin and if user is admin
  if (requireAdmin && !isAdmin) {
    // User is logged in but not an admin
    // Redirect them to the dashboard
    return <Navigate to="/" replace />;
  }

  // 3. If all checks pass, render the child component
  return children;
}

export default ProtectedRoute;