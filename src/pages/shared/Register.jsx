import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    role: 'user',
    status: 'active',
    profile_pic: '', // optional
  });

  const [message, setMessage] = useState('');

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
      const res = await axios.post('http://localhost:3000/api/user/signup', formData);
      setMessage('Registration successful ✅');
      setFormData({ email: '', password: '', phone: '', role: 'user', status: 'active', profile_pic: '' });
    } catch (err) {
      setMessage('Registration failed ❌');
    }
  };

  return (
    
    <div style={{ minHeight: '100vh' }} className="d-flex justify-content-center align-items-center">
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <h3 className="mb-4">Register</h3>
          {message && <Alert>{message}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (min 8 characters)"
                minLength={8}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone"
                minLength={10}
                maxLength={10}
                required
              />
            </Form.Group>

            {/* Optional: Profile Pic */}
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control
                type="text"
                name="profile_pic"
                value={formData.profile_pic}
                onChange={handleChange}
                placeholder="Image URL (optional)"
              />
            </Form.Group>

            {/* Optional: Role dropdown (or just use default) */}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </Form.Select>
            </Form.Group>

            {/* Optional: Status (set to active by default) */}
            <Form.Group className="mb-4">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Register
            </Button>

            <div className="text-center">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
    
  );
};

export default Register;
