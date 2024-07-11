import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggingUser'));

  if (loggedInUser && allowedRoles.includes(loggedInUser.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/home" />;
  }
};

export default ProtectedRoute;
