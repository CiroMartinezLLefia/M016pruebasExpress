import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../state/auth';

export default function ProtectedRoute({ children, requireRole }) {
  const { isLogged, user } = useAuth();

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user?.rol !== requireRole && user?.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
