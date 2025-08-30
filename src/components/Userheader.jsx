import React from 'react';
import { Container, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../globalstate/features/UserSlice';

const Userheader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from redux store
  const isLoggedIn = useSelector((state) => state.user.isUserAuth);
  const userData = useSelector((state) => state.user.userData);

  const cartItemCount = 3; // mock for now

  const handleLogout = () => {
    dispatch(clearUser()); // clear redux state
    navigate('/login'); // redirect to login
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
              <span className="text-light ms-3">
                Hi, {userData?.name || "User"}
              </span>
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






       {/* {isLoggedIn ? (
  <Nav.Item>
    <Link to="/profile">
      <Image
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        roundedCircle
        width="40"
        height="40"
        alt="User Avatar"
        style={{ objectFit: "cover" }}
      />
    </Link>
  </Nav.Item>
) : (
  <Nav.Item>
    <Link to="/login" className="nav-link">
      Login
    </Link>
  </Nav.Item>
)} */}