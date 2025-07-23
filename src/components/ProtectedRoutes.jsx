import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { session, isLoading } = useSession();
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';

  if (isLoading && !isDashboard) return <Loading />;

  if (!session && !isLoading) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
