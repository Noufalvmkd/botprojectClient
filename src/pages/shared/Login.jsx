import React from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../globalstate/features/UserSlice';
import { useForm } from 'react-hook-form';
import axiosinstance from '../../config/axiosinstance';

const Login = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = React.useState('');

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Default user settings
  const user = {
    role: 'user',
    loginApi: '/user/login',
  };

  // Override if admin
  if (role === 'admin') {
    user.role = 'admin';
    user.loginApi = '/admin/login';
  }

  const onSubmit = async (data) => {
    setMessage('');

    try {
      const res = await axiosinstance({
        method: 'POST',
        url: user.loginApi,
        data,
        withCredentials: true, // crucial for cookies
      });

      // Fetch logged user info after login
      const checkUserRes = await axiosinstance.get('/user/check-user', {
        withCredentials: true,
      });

      // Save user in Redux
      dispatch(saveUser(checkUserRes?.data?.data));

      // ✅ Decide where to redirect
      let redirectTo;
      if (user.role === "admin") {
        // Admin → dashboard
        redirectTo = location.state?.from || "/admin/dashboard";
      } else {
        // User → homepage (or back to previous page like product/cart)
        redirectTo = location.state?.from || "/";
      }

      navigate(redirectTo, { replace: true });

    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }} className="d-flex justify-content-center align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <h3 className="text-center mb-4">Login! {user.role}</h3>
            {message && <Alert variant="danger">{message}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register('email', { required: 'Email is required' })}
                  autoComplete="email"
                />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                  autoComplete="current-password"
                />
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mb-3" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center">
                Don&apos;t have an account? <Link to="/register">Register here</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
