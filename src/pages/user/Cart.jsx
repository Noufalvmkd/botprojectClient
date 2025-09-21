import React, { useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import CartCards from "../../components/CartCards";
import axiosinstance from "../../config/axiosinstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [refreshState, setRefreshState] = useState(false);
  const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);

  const handleRemove = async (productId) => {
    try {
      console.log("Remove product with id:", productId);
      await axiosinstance({
        method: "DELETE",
        url: `/cart/remove/${productId}`,
        data: { productId },
      });
      toast.success("item removed");
      setRefreshState((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "failed to remove");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-5 text-center">
        Failed to load cart: {error.message || error}
      </Alert>
    );
  }

  if (!cartDetails || !cartDetails.products?.length) {
    return (
      <Alert variant="info" className="mt-5 text-center">
        No items in cart
      </Alert>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Cart Page</h1>

      {/* Cart Items */}
      <Row>
        {cartDetails.products.map((item) => (
          <Col key={item._id} sm={12} md={6} lg={4}>
            <CartCards item={item} handleRemove={handleRemove} />
          </Col>
        ))}
      </Row>

      {/* Cart Total with Checkout Button */}
      <Row className="mt-4">
        <Col className="text-end">
          <h4>Total: ₹{cartDetails.totalPrice?.toFixed(2)}</h4>

          {/* Only Checkout Page button now */}
          <button className="btn btn-primary" onClick={() => navigate("/user/checkout")}>
      Proceed to Checkout
    </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

 