import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuth) {
      navigate("/login");
    }
  }, [isUserAuth, navigate]);

  // If not authenticated, don’t render children yet
  if (!isUserAuth) {
    return null;  // or you can return a loader/spinner
  }

  return <Outlet />;
}

export default ProtectedRoute;
