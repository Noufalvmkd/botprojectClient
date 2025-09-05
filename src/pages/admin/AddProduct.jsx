import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AddProductForm from "../../components/admin/AddProductForm";

const AddProduct = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="shadow-lg border-0 rounded-3">
            <Card.Body>
              {/* Title */}
              <h2 className="text-center fw-semibold fs-3 my-4 text-decoration-underline">
                Create New Course
              </h2>

              {/* Form */}
              <AddProductForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
