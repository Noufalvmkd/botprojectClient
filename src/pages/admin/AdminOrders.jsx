import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Badge, Spinner } from "react-bootstrap";
import axiosinstance from "../../config/axiosinstance";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosinstance.get("/orders/get-all-orders");
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch orders");
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axiosinstance.put(`/orders/update-order-status/${id}`, { status });
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axiosinstance.delete(`/orders/delete-order/${id}`);
      toast.success("Order deleted");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to delete order");
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
      <h2 className="pt-3">Manage Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.slice(-6).toUpperCase()}</td>
              <td>{order.user?.email}</td>
              <td>
                <Form.Select
                  value={order.orderStatus}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </td>
              <td>
                {order.paymentInfo?.method}{" "}
                <Badge bg={order.paymentInfo?.status === "paid" ? "success" : "secondary"}>
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
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrders;
