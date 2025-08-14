import React from 'react';
import { Container, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Userheader = () => {
  // TODO: Replace these with real auth/cart context later
  const isLoggedIn = false; // mock login state
  const userName = "Noufal"; // mock user
  const cartItemCount = 3;   // mock cart items

  const handleLogout = () => {
    // TODO: Implement logout logic here (e.g., clear token, navigate)
    alert("Logout clicked!");
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">MY-ZONE</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/products">Products</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>

        <form className="d-flex me-3">
          <input type="text" placeholder="Search" className="form-control me-2" />
          <Button variant="outline-light">Search</Button>
        </form>

        <Nav className="align-items-center">
          <Nav.Link as={Link} to="/cart" className="position-relative">
            🛒 Cart
            <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
              {cartItemCount}
            </Badge>
          </Nav.Link>

          {isLoggedIn ? (
            <>
              <span className="text-light ms-3">Hi, {userName}</span>
              <Button onClick={handleLogout} variant="outline-warning" className="ms-3">
                Logout
              </Button>
            </>
          ) : (
            <Button as={Link} to="/login" variant="success" className="ms-2">
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Userheader;
