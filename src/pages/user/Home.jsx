import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCards';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CarouselComponent from '../../components/user/CarouselComponent';
import Products from './Products';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isAdminAuth } = useSelector((state) => state.admin); // check if admin logged in

  // const getProduct = () => {
  //   axios('https://fakestoreapi.com/products')
  //     .then((res) => {
  //       setProducts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getProduct();
  // }, []);

  // const handleAdminLoginClick = () => {
  //   if (isAdminAuth) {
  //     // If admin already logged in, go to dashboard
  //     navigate('/admin/dashboard', { replace: true });
  //   } else {
  //     // Otherwise go to admin login page
  //     navigate('/admin/login');
  //   }
  // };

  // console.log("API Domain =>", import.meta.env.VITE_API_DOMAIN);

  return (
    <>
      <div style={{ paddingTop: "70px" }}>
        <CarouselComponent />

        {/* Add Admin Login Button */}
        {/* <Container className="my-4 text-center">
          <Button variant="primary" onClick={handleAdminLoginClick}>
            Login as Admin
          </Button>
        </Container> */}

        <Products />

        <Container className="my-4">
          <h2 className="mb-4">Featured Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product.id} xs={12} xm={6} md={4} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
