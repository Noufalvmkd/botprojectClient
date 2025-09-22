import React from "react";
import { Link, useNavigate } from "react-router-dom";   // 👈 add useNavigate
import { ShoppingBag, Heart, User } from "lucide-react";
import { Navbar, Nav, Container, Badge, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";              // 👈 add useDispatch
import { clearAdmin } from "../../globalstate/features/AdminSlice";
import axiosinstance from "../../config/axiosinstance";

const AdminHeader = () => {
  const dispatch = useDispatch();   // 👈 get dispatch
  const navigate = useNavigate();   // 👈 get navigate function

  const handleLogout = async () => {
    try {
      await axiosinstance.put("/admin/logout", {}, { withCredentials: true });

      // clear redux user state
      dispatch(clearAdmin());

      // navigate to home
      navigate("/");   // 👈 now this will work immediately
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          Logo  welcome to admin page
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto fw-semibold">
            <Nav.Link as={Link} to="/admin/dashboard">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-product">Manage products</Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-orders">Manage orders</Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center gap-3">
            {/* Profile Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="nav-link p-0 border-0 bg-transparent cursor-pointer">
                <User size={24} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/user/profile">My Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/user/settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
