import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";

const CreateDisposalForm = () => {
  const [formData, setFormData] = useState({
    warehouse_id: "", // Đổi warehouse_id theo yêu cầu của bạn
    detail: [
      {
        product_id: "",
        zone_id: "",
        expire_date: "",
        quantity: "",
        reason: "",
      },
    ],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newDetail = [...formData.detail];
    newDetail[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      detail: newDetail,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MyAxios.post("/goods_disposal/create", formData);
      console.log("Disposal created:", response.data);
      // Clear form or handle success as needed
    } catch (error) {
      console.error("Error creating disposal:", error);
    }
  };

  const handleAddProduct = () => {
    setFormData((prevData) => ({
      ...prevData,
      detail: [
        ...prevData.detail,
        {
          product_id: "",
          zone_id: "",
          expire_date: "",
          quantity: "",
          reason: "",
        },
      ],
    }));
  };

  return (
    <div>
      <h2>Create Disposal Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Warehouse ID</Form.Label>
          <Form.Control
            type="number"
            name="warehouse_id"
            value={formData.warehouse_id}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                warehouse_id: e.target.value,
              }))
            }
            required
          />
        </Form.Group>
        {formData.detail.map((item, index) => (
          <div key={index}>
            <Form.Group className="mb-3">
              <Form.Label>Product {index + 1} ID</Form.Label>
              <Form.Control
                type="number"
                name="product_id"
                value={item.product_id}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zone {index + 1} ID</Form.Label>
              <Form.Control
                type="number"
                name="zone_id"
                value={item.zone_id}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expire Date {index + 1}</Form.Label>
              <Form.Control
                type="date"
                name="expire_date"
                value={item.expire_date}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity {index + 1}</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason {index + 1}</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={item.reason}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="primary" type="submit">
          Create Disposal
        </Button>
        <Button className="ms-2" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export default CreateDisposalForm;
