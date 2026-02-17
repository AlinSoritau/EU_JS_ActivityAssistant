import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

function ProtectedRoute({ children }) {
  // Check if user has a valid token
  if (!isAuthenticated()) {
    // No token found, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected content
  return children;
}

export default ProtectedRoute;