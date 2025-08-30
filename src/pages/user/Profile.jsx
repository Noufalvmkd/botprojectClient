import React from "react";
import useFetch from "../../hooks/useFetch";
import axiosinstance from "../../config/axiosinstance";

const Profile = () => {
  const [profileData, isLoading, error] = useFetch("/user/profile");

  const handleLogout = async () => {
    try {
      await axiosinstance.put("/user/logout");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p className="text-center mt-4">Loading profile...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error.message}</p>;

  const user = profileData?.data; // 👈 extract `data` from response

  return (
    <div className="container mt-5">
      <div className="d-flex gap-2 mb-4">
        <button className="btn btn-primary">Orders</button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card shadow-sm p-4">
        <div className="text-center">
          <img
            src={user?.profile_pic || "https://via.placeholder.com/150"}
            className="rounded-circle mb-3"
            alt="Profile"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h3>{user?.email}</h3>
          <p className="text-muted">{user?.phone}</p>
          <p className="badge bg-success">{user?.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
