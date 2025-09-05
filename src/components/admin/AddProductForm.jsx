import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosinstance from "../../config/axiosinstance";
import toast from "react-hot-toast";
import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("rating", data.rating || 0);
      formData.append("reviews", data.reviews || "");
      formData.append("image", data.image[0]);

      const response = await axiosinstance.post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "Product added successfully");
      reset(); // clear form
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg p-4">
      <h3 className="text-center mb-4">Add New Product</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("name", { required: "Product name is required" })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                {...register("price", { required: "Price is required" })}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            {...register("description", { required: "Description is required" })}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rating (optional)"
                {...register("rating")}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Reviews</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reviews (optional)"
                {...register("reviews")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            {...register("image", { required: "Image is required" })}
            isInvalid={!!errors.image}
          />
          <Form.Control.Feedback type="invalid">
            {errors.image?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Create Product"}
        </Button>
      </Form>
    </Card>
  );
};

export default AddProductForm;
