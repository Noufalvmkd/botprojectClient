import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  // console.log("hi====", product);
  
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '250px', objectFit: 'contain' }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <strong>₹{product.price}</strong><br />
          <small>{product.description}</small><br />
          <span style={{ color: '#888' }}>
  ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
</span>

        </Card.Text>
        <Button variant="primary" onClick={()=>navigate(`/productDetails/${product?._id}`)}>Details</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
