import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: '250px', objectFit: 'contain' }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          <strong>${product.price}</strong><br />
          <small>{product.category}</small><br />
          <span style={{ color: '#888' }}>
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </span>
        </Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
