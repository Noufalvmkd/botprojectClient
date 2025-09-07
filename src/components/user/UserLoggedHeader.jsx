import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, User } from "lucide-react";
import { Navbar, Nav, Container, Badge, Dropdown } from "react-bootstrap";
import axiosinstance from "../../config/axiosinstance";
import { useDispatch } from "react-redux";
import { clearUser } from "../../globalstate/features/UserSlice"; // 👈 adjust path if needed

const UserLoggedHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosinstance.put("/user/logout", {}, { withCredentials: true });

      // clear redux user state
      dispatch(clearUser());

      // navigate to home
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          Logo
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left side links */}
          <Nav className="me-auto fw-semibold">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>

          {/* Right side icons */}
          <Nav className="ms-auto align-items-center gap-3">
            {/* Wishlist */}
            <Nav.Link as={Link} to="/user/wishlist" className="position-relative">
              <Heart size={22} />
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                2
              </Badge>
            </Nav.Link>

            {/* Cart */}
            <Nav.Link as={Link} to="/user/cart" className="position-relative">
              <ShoppingBag size={22} />
              <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
                3
              </Badge>
            </Nav.Link>

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

export default UserLoggedHeader;
