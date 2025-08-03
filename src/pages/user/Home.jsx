import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCards';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProduct = () => {
    axios('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4">Featured Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs = {12} xm ={6} md= {4} lg= {4} xl = {3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
