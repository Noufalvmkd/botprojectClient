import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateLoginStatus } from '../../globalstate/login/LoginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_DOMAIN}/api/user/login`,
      formData,
      { withCredentials: true }
    );

    console.log(res);
    dispatch(updateLoginStatus(true));
    navigate('/');
  } catch (err) {
    setMessage(err.response?.data?.message || "Login failed");
  }
};

  return (
<div style={{ minHeight: '100vh' }} className="d-flex justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <h3 className="text-center mb-4">Login</h3>
            {message && <Alert variant="danger">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mb-3">
                Login
              </Button>

              <div className="text-center">
                Don't have an account? <Link to="/register">Register here</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;