// src/components/Footer.jsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>My-Zone</h5>
            <p>Best place to buy your favorite products.</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Contact</h6>
            <p>Email: support@myzone.com</p>
            <p>Phone: +971 123 456 789</p>
            <p>Location: Abu Dhabi, UAE</p>
          </Col>
        </Row>

        <hr className="border-light" />

        <Row>
          <Col className="text-center">
            <small>© {new Date().getFullYear()} My-Zone. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
