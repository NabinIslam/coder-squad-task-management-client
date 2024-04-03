import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
import LoadingSpinner from '../ui/LoadingSpinner';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { isloggedIn, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (isloggedIn) return children;

  return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
