import { Navigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { session, isLoading } = useSession();

  if (isLoading) return <Loading />;

  if (!session) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
