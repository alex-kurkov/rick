import { useLocation, Navigate } from 'react-router-dom';
import { RouterPaths } from '../../router-paths';
import { FC } from 'react';
import { useAuth } from '../../context/authProvider';

export const ProtectedRoute: FC<any> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === null) {
    return (
      <Navigate
        to={RouterPaths.LOGIN}
        state={{ from: location.pathname, search: location.search }}
        replace
      />
    );
  }

  return children;
};
