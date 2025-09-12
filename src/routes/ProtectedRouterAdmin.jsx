import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRouterAdmin = () => {
  const { isAdminAuth } = useSelector((state) => state.admin);
  const location = useLocation();

  if (!isAdminAuth) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRouterAdmin;
