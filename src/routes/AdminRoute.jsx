// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user info

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />; // redirect non-admins to homepage
  }

  return children;
};

export default AdminRoute;
