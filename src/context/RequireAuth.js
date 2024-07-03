/* eslint-disable prettier/prettier */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  console.log('currentUser' + currentUser)
  console.log('children' + children)
  const location = useLocation();
  if (!currentUser) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}

export default RequireAuth;
