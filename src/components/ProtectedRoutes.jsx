import { Navigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

const ProtectedRoute = ({ children }) => {
  const { session, isLoading } = useSession();

  if (isLoading) return <p>Loading...</p>;

  if (!session) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
