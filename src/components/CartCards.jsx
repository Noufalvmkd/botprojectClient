import React from "react";
import { Card, Button } from "react-bootstrap";

const CartCards = ({ item, handleRemove  }) => {
  const product = item?.productId;

  // calculate subtotal
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <Card className="mb-4 shadow-sm mt-5">
      <Card.Img
        variant="top"
        src={product?.image || "https://via.placeholder.com/200"}
        alt={product?.title || "Product"}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{product?.title || "Untitled Product"}</Card.Title>
        <Card.Text>{product?.description || "No description available"}</Card.Text>

        <Card.Text>
          <strong>Unit Price:</strong> ₹{item.price}
        </Card.Text>
        <Card.Text>
          <strong>Quantity:</strong> {item.quantity}
        </Card.Text>
        <Card.Text>
          <strong>Subtotal:</strong> ${subtotal}
        </Card.Text>

        <Button
          variant="danger"
          onClick={() =>{
            handleRemove(product?._id)
            
          }}

        >
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartCards;
