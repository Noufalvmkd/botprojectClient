import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Spinner } from "react-bootstrap";
import axiosinstance from "../../config/axiosinstance";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [isSaving, setIsSaving] = useState(false); // New: Save button loading state

  // Fetch all products (READ)
  const fetchProducts = async () => {
    try {
      const res = await axiosinstance.get("products/getproducts");
      // Ensure products is always an array
      setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Save (CREATE / UPDATE)
  const handleSave = async () => {
    setIsSaving(true); // disable save button
    try {
      const formData = new FormData();
      formData.append("name", currentProduct.name);
      formData.append("price", currentProduct.price);
      formData.append("description", currentProduct.description);

      if (currentProduct.image instanceof File) {
        formData.append("image", currentProduct.image);
      }

      if (isEdit) {
        await axiosinstance.put(
          `products/update/${currentProduct._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Check for duplicate product before adding
        const duplicate = products.find(
          (p) =>
            p.name.trim().toLowerCase() === currentProduct.name.trim().toLowerCase()
        );
        if (duplicate) {
          alert("Product with this name already exists!");
          setIsSaving(false);
          return;
        }

        await axiosinstance.post("products/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false); // close modal after success
      fetchProducts(); // refresh list after save
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Check console for details.");
    } finally {
      setIsSaving(false); // re-enable button
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosinstance.delete(`products/delete/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  // Open modal for Add
  const handleAdd = () => {
    setIsEdit(false);
    setCurrentProduct({ name: "", price: "", description: "", image: "" });
    setShowModal(true);
  };

  // Open modal for Edit
  const handleEdit = (product) => {
    setIsEdit(true);
    setCurrentProduct(product);
    setShowModal(true);
  };

  return (
    <Container className="my-5">
      <h2 className="pt-3">Admin Products</h2>
      <Button variant="primary" className="mb-3" onClick={handleAdd}>
        Add Product
      </Button>

      {/* Product Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.description}</td>
              <td>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    width="50"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={currentProduct.description}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, image: e.target.files[0] })
                }
              />
              {isEdit &&
                currentProduct.image &&
                typeof currentProduct.image === "string" && (
                  <img
                    src={currentProduct.image}
                    alt="preview"
                    width="100"
                    className="mt-2"
                  />
                )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving} // disable while saving
          >
            {isSaving ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Saving...
              </>
            ) : isEdit ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminProducts;
