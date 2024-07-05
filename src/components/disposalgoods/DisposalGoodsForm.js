import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import MyAlert from "../../components/share/MyAlert";

const CreateDisposalForm = () => {
  const [warehouseId, setWarehouseId] = useState("");
  const [details, setDetails] = useState([
    { productId: "", zoneId: "", expireDate: "", quantity: "", reason: "" },
  ]);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { productId: "", zoneId: "", expireDate: "", quantity: "", reason: "" }]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MyAxios.post("/goods_disposal/create", {
        warehouse_id: warehouseId,
        detail: details.map(detail => ({
          product_id: detail.productId,
          zone_id: detail.zoneId,
          expire_date: detail.expireDate,
          quantity: detail.quantity,
          reason: detail.reason,
        })),
      });
      setAlert({ show: true, message: "Disposal form created successfully", variant: "success" });
    } catch (error) {
      setAlert({ show: true, message: "Error creating disposal form", variant: "danger" });
      console.error("Error creating disposal form:", error);
    }
  };

  return (
    <Container>
      <h1>Create Disposal Form</h1>
      {alert.show && <MyAlert message={alert.message} variant={alert.variant} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="warehouseId">
          <Form.Label>Warehouse ID</Form.Label>
          <Form.Control
            type="text"
            value={warehouseId}
            onChange={(e) => setWarehouseId(e.target.value)}
            required
          />
        </Form.Group>
        {details.map((detail, index) => (
          <div key={index} className="mb-3">
            <Row>
              <Col>
                <Form.Group controlId={`productId-${index}`}>
                  <Form.Label>Product ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={detail.productId}
                    onChange={(e) => handleDetailChange(index, "productId", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`zoneId-${index}`}>
                  <Form.Label>Zone ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={detail.zoneId}
                    onChange={(e) => handleDetailChange(index, "zoneId", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId={`expireDate-${index}`}>
                  <Form.Label>Expire Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={detail.expireDate}
                    onChange={(e) => handleDetailChange(index, "expireDate", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`quantity-${index}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={detail.quantity}
                    onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`reason-${index}`}>
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    type="text"
                    value={detail.reason}
                    onChange={(e) => handleDetailChange(index, "reason", e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="danger" onClick={() => handleRemoveDetail(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddDetail}>
          Add Product
        </Button>
        <Button variant="success" type="submit" className="mt-3">
          Submit Disposal Form
        </Button>
      </Form>
    </Container>
  );
};

export default CreateDisposalForm;
