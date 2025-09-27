import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axiosinstance from "../../config/axiosinstance";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // COD Order
  
// COD Order
const placeOrder = async () => {
  try {
    // 1. Fetch cart
    const cartRes = await axiosinstance.get("/cart/get-cart");
    const cart = cartRes.data;

    if (!cart || !cart.products || cart.products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // 2. Map cart products to order products
    const formattedProducts = cart.products.map((p) => ({
      product: p.productId, // required for Order schema
      quantity: p.quantity,
      price: p.price,
    }));

    // 3. Calculate totalAmount (just in case)
    const totalAmount = cart.totalPrice || formattedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    // 4. Send order to backend
    const orderRes = await axiosinstance.post("/orders/create-order", {
      products: formattedProducts,
      shippingInfo,
      paymentInfo: { method: "COD", status: "pending" },
      totalAmount,
    });

    toast.success("Order placed successfully (COD)!");
    console.log("Order Response:", orderRes.data);

    // 5. Redirect to My Orders page
    navigate("/user/my-orders"); // use useNavigate instead of window.location.href
  } catch (error) {
    console.error("Create Order Error:", error.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Failed to place order");
  }
};



  // Stripe Payment
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

      // 1. Get cart
      const cartRes = await axiosinstance.get("/cart/get-cart");

      // 2. Create checkout session
      const session = await axiosinstance.post("/payment/createpayment", {
        products: cartRes.data.products,
      });

      // 3. Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });

      if (result.error) {
        console.error("Stripe Error:", result.error.message);
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Stripe Payment Error:", error.response?.data || error.message);
      toast.error("Stripe payment failed");
    }
  };

  return (
    <Container className="my-5">
      <h2>Checkout</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control name="address" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control name="city" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control name="country" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control name="postalCode" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control name="phone" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card (Stripe)</option>
          </Form.Select>
        </Form.Group>

        {paymentMethod === "COD" ? (
          <Button variant="primary" onClick={placeOrder}>
            Place Order (COD)
          </Button>
        ) : (
          <Button variant="success" onClick={makePayment}>
            Pay with Card
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default Checkout;
