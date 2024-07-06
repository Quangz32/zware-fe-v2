import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import MyAxios from '../../util/MyAxios';

const CreateDisposal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: '',
    zone_name: '',
    expire_date: '',
    quantity: '',
    reason: '',
  });

  useEffect(() => {
    if (location.state) {
      setFormData({
        ...formData,
        product_name: location.state.product_name || '',
        zone_name: location.state.zone_name || '',
        expire_date: location.state.expire_date || '',
        quantity: location.state.quantity || '',
      });
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await MyAxios.post('/goods_disposal/create', {
        warehouse_id: 1, // Adjust as needed
        detail: [
          {
            product_name: formData.product_name,
            zone_name: formData.zone_name,
            expire_date: formData.expire_date,
            quantity: formData.quantity,
            reason: formData.reason,
          },
        ],
      });
      navigate('/disposal-goods', { state: { disposedGood: formData } });
    } catch (error) {
      console.error('Error creating disposal form:', error);
    }
  };

  return (
    <div>
      <h1>Create Disposal</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="product_name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="zone_name">
          <Form.Label>Zone Name</Form.Label>
          <Form.Control
            type="text"
            name="zone_name"
            value={formData.zone_name}
            onChange={handleInputChange}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="expire_date">
          <Form.Label>Expire Date</Form.Label>
          <Form.Control
            type="date"
            name="expire_date"
            value={formData.expire_date}
            onChange={handleInputChange}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="reason">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateDisposal;
