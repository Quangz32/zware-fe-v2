import React, { useState } from 'react';
import { Modal, Button, Form, Table, Alert, Row, Col } from 'react-bootstrap';

const AddTransactionModal = ({ show, handleClose, handleSave }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [source, setSource] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [externalSource, setExternalSource] = useState("");

  const addItemRow = () => {
    setItems([...items, { id: items.length + 1, name: "", expire_date: "", supplier: "", quantity: 0, zone: "" }]);
  };

  const removeItemRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      setError("Please add at least one product item.");
      return;
    }

    const newTransaction = {
      date: e.target.elements.newTransactionDate.value,
      status: "Pending", // Hardcoded to Pending
      source: source === "Internal" ? `Warehouse ${warehouse}` : externalSource,
      items: items
    };

    // Simulate save logic
    handleSave(newTransaction);
    handleClose();
    setItems([]);
    setError("");
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add New Inbound Transaction</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" required id="newTransactionDate" />
              </Form.Group>
            </Col>
            
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Source</Form.Label>
                <Form.Control
                  as="select"
                  id="newTransactionSource"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </Form.Control>
              </Form.Group>
            </Col>
            {source === "Internal" && (
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Warehouse</Form.Label>
                  <Form.Control
                    as="select"
                    id="newTransactionWarehouse"
                    value={warehouse}
                    onChange={(e) => setWarehouse(e.target.value)}
                    required
                  >
                    <option value="">Select Warehouse</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i + 1}>Warehouse {i + 1}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            )}
            {source === "External" && (
              <Col md={6}>
                <Form.Group>
                  <Form.Label>External Source</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="newTransactionExternalSource" 
                    value={externalSource}
                    onChange={(e) => setExternalSource(e.target.value)}
                    required 
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
          <Form.Group>
            <Form.Label>Product Items</Form.Label>
            <div style={{ overflowX: 'auto' }}>
              <Table bordered style={{ minWidth: '100%' }}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Expire Date</th>
                    <th>Quantity</th>
                    <th>Zone</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Control as="select" value={item.name} onChange={(e) => handleChange(index, 'name', e.target.value)} required>
                          <option value="">Select Product</option>
                          <option value="Product A">Product A</option>
                          <option value="Product B">Product B</option>
                          <option value="Product C">Product C</option>
                        </Form.Control>
                      </td>
                      <td><Form.Control type="date" value={item.expire_date} onChange={(e) => handleChange(index, 'expire_date', e.target.value)} required /></td>
                      {/* <td><Form.Control type="text" value={item.supplier} onChange={(e) => handleChange(index, 'supplier', e.target.value)} required /></td> */}
                      <td><Form.Control type="number" value={item.quantity} onChange={(e) => handleChange(index, 'quantity', e.target.value)} required /></td>
                      <td>
                        <Form.Control as="select" value={item.zone} onChange={(e) => handleChange(index, 'zone', e.target.value)} required>
                          <option value="">Select Zone</option>
                          <option value="Zone A">Zone A</option>
                          <option value="Zone B">Zone B</option>
                          <option value="Zone C">Zone C</option>
                        </Form.Control>
                      </td>
                      <td><Button variant="danger" onClick={() => removeItemRow(index)}>Remove</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Button variant="secondary" onClick={addItemRow}>Add Product Item</Button>
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTransactionModal;
