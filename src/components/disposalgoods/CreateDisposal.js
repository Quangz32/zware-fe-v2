import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyAxios from "../../util/MyAxios";

const CreateDisposalForm = () => {
  const [formData, setFormData] = useState({
    warehouse_id: "",
    product_id: "",
    zone_id: "",
    expire_date: "",
    quantity: "",
    reason: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await MyAxios.post("http://localhost:2000/api/goods_disposal/create", formData);
      alert("Disposal created successfully!");
      navigate("/disposedgoods"); // Redirect to the disposal goods list page
    } catch (error) {
      console.error("Error creating disposal:", error);
      alert("Failed to create disposal.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Disposal</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="warehouse_id">
            <Form.Label>Warehouse ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter warehouse ID"
              name="warehouse_id"
              value={formData.warehouse_id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="product_id">
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product ID"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="zone_id">
            <Form.Label>Zone ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zone ID"
              name="zone_id"
              value={formData.zone_id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="expire_date">
            <Form.Label>Expire Date</Form.Label>
            <Form.Control
              type="date"
              name="expire_date"
              value={formData.expire_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reason for disposal"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateDisposalForm;
