import React, { useEffect, useState } from "react";
import axiosinstance from "../../config/axiosinstance";
import { Table, Button } from "react-bootstrap";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await axiosinstance.get("/admin/check-users");
      setUsers(res.data.users);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch users");
    }
  };

  // Toggle user active/inactive
 const toggleStatus = async (id, currentStatus) => {
  try {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    await axiosinstance.put(`/admin/update-user-status/${id}`, { status: newStatus });

    toast.success(`User status updated to ${newStatus}`);
    fetchUsers(); // refresh the list
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to update status");
  }
};



  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <h2>Admin: Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
  <tr key={user._id}>
    <td>{user.email}</td>
    <td>{user.role}</td>
    <td>{user.status}</td>   {/* ✅ show status */}
    <td>
      <Button
        variant={user.status === "active" ? "danger" : "success"}
        onClick={() => toggleStatus(user._id, user.status)}
      >
        {user.status === "active" ? "Deactivate" : "Activate"}
      </Button>
    </td>
  </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminUsers;
