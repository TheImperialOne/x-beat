import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a simple check. We assume `isAuthenticated` is a boolean.
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
