import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';

const ProtectedRoute = ({children}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet/>  : <Navigate to="/login" />;
};

export default ProtectedRoute;
