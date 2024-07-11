import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import MyAxios from "../../util/MyAxios";

const CreateDisposalForm = () => {
  const [formData, setFormData] = useState({
    warehouse_id: "",
    details: {
      product_id: "",
      zone_id: "",
      expire_date: "",
      quantity: "",
      reason: ""
    }
  });

  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [warehouseRes, productRes, zoneRes] = await Promise.all([
          MyAxios.get("/api/warehouses"),
          MyAxios.get("/api/products"),
          MyAxios.get("/api/zones"),
        ]);
        setWarehouses(warehouseRes.data);
        setProducts(productRes.data);
        setZones(zoneRes.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Failed to load form options.");
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleProductSelect = (selectedOption) => {
    const selectedProduct = products.find(product => product.id === selectedOption.value);
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        product_id: selectedProduct.id,
        zone_id: selectedProduct.default_zone_id,
        expire_date: selectedProduct.expire_date,
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await MyAxios.post("/api/goods_disposal/create", formData);
      setSuccess(true);
      navigate("/disposedgoods"); // Redirect to the disposal goods list page
    } catch (error) {
      console.error("Error creating disposal:", error);
      setError("Failed to create disposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Disposal</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Disposal created successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="warehouse_id">
            <Form.Label>Warehouse</Form.Label>
            <Form.Control
              as="select"
              name="warehouse_id"
              value={formData.warehouse_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="product_id">
            <Form.Label>Product</Form.Label>
            <Select
              className="mb-2"
              isSearchable
              value={products.find((product) => product.id === formData.details.product_id)}
              onChange={handleProductSelect}
              options={products.map((product) => ({
                label: product.name,
                value: product.id,
              }))}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="zone_id">
            <Form.Label>Zone</Form.Label>
            <Form.Control
              as="select"
              name="zone_id"
              value={formData.details.zone_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="expire_date">
            <Form.Label>Expire Date</Form.Label>
            <Form.Control
              type="date"
              name="expire_date"
              value={formData.details.expire_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              name="quantity"
              value={formData.details.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reason for disposal"
              name="reason"
              value={formData.details.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default CreateDisposalForm;
