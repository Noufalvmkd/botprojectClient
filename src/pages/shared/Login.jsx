import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../globalstate/features/UserSlice';
import { saveAdmin, clearAdmin } from '../../globalstate/features/AdminSlice';
import { useForm } from 'react-hook-form';
import axiosinstance from '../../config/axiosinstance';

const Login = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminAuth } = useSelector((state) => state.admin); // get admin auth from Redux
  const [checkingAdmin, setCheckingAdmin] = useState(role === "admin"); // only check for admin
  const [message, setMessage] = useState('');

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

  // Check if admin already logged in on mount
  useEffect(() => {
    if (role === 'admin') {
      const checkAdmin = async () => {
        try {
          const res = await axiosinstance.get('/admin/check-admin', { withCredentials: true });
          dispatch(saveAdmin(res.data.data)); // save admin info in Redux
        } catch (err) {
          console.error('Admin not authorized', err);
          dispatch(clearAdmin()); // clear Redux if invalid
        } finally {
          setCheckingAdmin(false);
        }
      };
      checkAdmin();
    } else {
      setCheckingAdmin(false);
    }
  }, [role, dispatch]);

  // Redirect if admin is already logged in
  useEffect(() => {
    if (!checkingAdmin && role === 'admin' && isAdminAuth) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [checkingAdmin, isAdminAuth, role, navigate]);

  const onSubmit = async (data) => {
    setMessage('');

    try {
      // 1) call role-specific login endpoint
      const res = await axiosinstance.post(user.loginApi, data, {
        withCredentials: true,
      });
      console.log('login response:', res.data);

      // 2) try to get profile directly from login response (if backend returns it)
      let profile = res?.data?.data || res?.data;

      // 3) if profile not returned in login response, call role-specific check endpoint
      if (!profile || !profile.role) {
        const checkUrl = user.role === 'admin' ? '/admin/check-admin' : '/user/check-user';
        console.log('calling check endpoint:', checkUrl);
        const checkRes = await axiosinstance.get(checkUrl, { withCredentials: true });
        console.log('check endpoint response:', checkRes.data);
        profile = checkRes?.data?.data || checkRes?.data;
      }

      // 4) defensive checks
      if (!profile) {
        setMessage('Login succeeded but could not verify profile. Try again.');
        return;
      }

      if (user.role === 'admin' && profile.role !== 'admin') {
        setMessage('This account is not an admin.');
        return;
      }

      // 5) dispatch to correct slice
      if (user.role === 'admin') {
        dispatch(saveAdmin(profile));
      } else {
        dispatch(saveUser(profile));
      }

      // 6) redirect
      const redirectTo = user.role === 'admin'
        ? (location.state?.from || '/admin/dashboard')
        : (location.state?.from || '/');
      navigate(redirectTo, { replace: true });

    } catch (err) {
      console.error('Login error:', err);
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  // Show loader while checking admin
  if (checkingAdmin) {
    return (
      <div
        style={{ minHeight: '100vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <div>Checking admin authentication...</div>
      </div>
    );
  }

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
