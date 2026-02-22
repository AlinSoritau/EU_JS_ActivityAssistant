import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authenticated = isAuthenticated()
  
  if (authenticated === false) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute