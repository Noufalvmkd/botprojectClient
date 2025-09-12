import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axiosinstance from "../config/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { saveAdmin, clearAdmin } from "../globalstate/features/AdminSlice";
import { Spinner } from "react-bootstrap";
import AdminHeader from "../components/admin/AdminHeader"; // your admin header
import Footer from "../components/Footer"; // if same footer used

const AdminRoot = () => {
  const { isAdminAuth } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [checkingAdmin, setCheckingAdmin] = useState(true);

  const checkAdmin = async () => {
    try {
      const response = await axiosinstance.get("/admin/check-admin", {
        withCredentials: true,
      });

      // save admin to redux
      dispatch(saveAdmin(response.data.data));
    } catch (err) {
      console.error("admin not authorized", err);

      // clear redux
      dispatch(clearAdmin());

      // protect all /admin routes
      if (location.pathname.startsWith("/admin")) {
        navigate("/admin/login");
      }
    } finally {
      setCheckingAdmin(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  if (checkingAdmin) {
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="layout">
      {isAdminAuth && <AdminHeader />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminRoot;
