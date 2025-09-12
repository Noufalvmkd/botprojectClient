import React from "react";
import Products from "../user/Products"
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // <-- import Link

const AdminPage = () => {
  return (
    <div style={{ paddingTop: "70px" }}>
      <Container>
        <h2 className="mb-4">Admin Dashboard</h2>

        {/* Reuse the Products component */}
        <Products />

        {/* Admin-only actions */}
        <div className="mt-5">
          <h4>Admin Actions</h4>

          {/* Link to Add Product page */}
          <Link to="/admin/manage-product">
            <Button variant="primary" className="me-2">
              Add New Product
            </Button>
          </Link>

          <Button variant="secondary">Manage Categories</Button>
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;

















// import React, { useState, useEffect } from "react";
// import { Table, Button, Form, Modal } from "react-bootstrap";
// import axios from "axios";

// const AdminPage = () => {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("add"); // "add" or "edit"
//   const [currentProduct, setCurrentProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: "",
//   });

//   // Fetch products
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//   try {
//     const res = await axios.get("/products/getproducts");
//     console.log("API response:", res.data); // check what comes
//     setProducts(res.data.products || []);   // <- adjust here
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };


//   // Add or Update Product
//   const handleSave = async () => {
//     try {
//       if (modalType === "add") {
//         await axios.post("/admin/products", currentProduct);
//       } else {
//         await axios.put(`/admin/products/${currentProduct._id}`, currentProduct);
//       }
//       setShowModal(false);
//       setCurrentProduct({ name: "", price: "", description: "", image: "" });
//       fetchProducts();
//     } catch (error) {
//       console.error("Error saving product:", error);
//     }
//   };

//   // Delete Product
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/admin/products/${id}`);
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   // Open Modal for Add
//   const handleAdd = () => {
//     setModalType("add");
//     setCurrentProduct({ name: "", price: "", description: "", image: "" });
//     setShowModal(true);
//   };

//   // Open Modal for Edit
//   const handleEdit = (product) => {
//     setModalType("edit");
//     setCurrentProduct(product);
//     setShowModal(true);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Admin Panel</h2>
//       <Button variant="primary" onClick={handleAdd} className="mb-3">
//         Add Product
//       </Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Description</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//   {Array.isArray(products) && products.map((p) => (
//     <tr key={p._id}>
//       <td>{p.name}</td>
//       <td>${p.price}</td>
//       <td>{p.description}</td>
//       <td>{p.image && <img src={p.image} alt={p.name} width="50" />}</td>
//       <td>
//         <Button variant="warning" onClick={() => handleEdit(p)} className="me-2">
//           Edit
//         </Button>
//         <Button variant="danger" onClick={() => handleDelete(p._id)}>
//           Delete
//         </Button>
//       </td>
//     </tr>
//   ))}
// </tbody>

//       </Table>

//       {/* Modal for Add/Edit */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalType === "add" ? "Add Product" : "Edit Product"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentProduct.name}
//                 onChange={(e) =>
//                   setCurrentProduct({ ...currentProduct, name: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={currentProduct.price}
//                 onChange={(e) =>
//                   setCurrentProduct({ ...currentProduct, price: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 value={currentProduct.description}
//                 onChange={(e) =>
//                   setCurrentProduct({ ...currentProduct, description: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Image URL</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentProduct.image}
//                 onChange={(e) =>
//                   setCurrentProduct({ ...currentProduct, image: e.target.value })
//                 }
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AdminPage;
