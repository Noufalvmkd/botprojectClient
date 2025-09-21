import React, { useEffect, useState } from "react";
import { Container, Table, Badge, Spinner } from "react-bootstrap";
import axiosinstance from "../../config/axiosinstance";
import toast from "react-hot-toast";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosinstance.get("/orders/my-orders");
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Orders Error:", error.response?.data || error.message);
      toast.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-6).toUpperCase()}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <Badge bg={
                    order.orderStatus === "delivered"
                      ? "success"
                      : order.orderStatus === "processing"
                      ? "warning"
                      : "secondary"
                  }>
                    {order.orderStatus}
                  </Badge>
                </td>
                <td>
                  {order.paymentInfo?.method}{" "}
                  <Badge
                    bg={
                      order.paymentInfo?.status === "paid"
                        ? "success"
                        : order.paymentInfo?.status === "failed"
                        ? "danger"
                        : "secondary"
                    }
                  >
                    {order.paymentInfo?.status}
                  </Badge>
                </td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  {order.products.map((p, i) => (
                    <div key={i}>
                      {p.quantity} x {p.product?.name || "Product"} (${p.price})
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Myorders;
