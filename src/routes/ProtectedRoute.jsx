
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const location = useLocation();

  // If user is not authenticated, redirect to login page
  // and preserve the location they were trying to access
  if (!isUserAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If authenticated, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;

//this for user













// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import { Outlet, useNavigate, } from 'react-router-dom'

// const ProtectedRoute = () => {
//   const { isUserAuth } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isUserAuth) {
//       navigate("/login");
//     }
//   }, [isUserAuth, navigate]);

//   // If not authenticated, don’t render children yet
//   if (!isUserAuth) {
//     return null;  // or you can return a loader/spinner
//   }

//   return <Outlet />;
// }

// export default ProtectedRoute;
