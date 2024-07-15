import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import ZoneList from "./ZoneList";
import { Button, Modal, Form, Table } from "react-bootstrap";

export default function WarehouseList({ warehouseSearchTerm, zoneSearchTerm, productSearchTerm, render }) {
  const [warehouses, setWarehouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ sourceZone: "", destinationZone: "", details: [{ product: "", quantity: 0 }] });
  const [currentWarehouseId, setCurrentWarehouseId] = useState(null);

  // Fetch warehouses from DB
  async function fetchWarehouses() {
    try {
      const response = await MyAxios.get("warehouses");
      const tempData = response.data.data;
      setWarehouses(tempData);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch zones for the selected warehouse
  async function fetchZones(warehouseId) {
    try {
      const response = await MyAxios.get(`/zones?warehouse_id=${warehouseId}`);
      const tempData = response.data.data;
      setZones(tempData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWarehouses();
  }, [render]);

  useEffect(() => {
    if (!warehouseSearchTerm && !zoneSearchTerm && !productSearchTerm) {
      fetchWarehouses();
    }
  }, [warehouseSearchTerm, zoneSearchTerm, productSearchTerm]);

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
  );

  const handleOpenModal = async (warehouseId) => {
    setCurrentWarehouseId(warehouseId);
    await fetchZones(warehouseId);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...modalData.details];
    updatedDetails[index][name] = value;
    setModalData(prevState => ({ ...prevState, details: updatedDetails }));
  };

  const handleAddRow = () => {
    setModalData(prevState => ({ ...prevState, details: [...prevState.details, { product: "", quantity: 0 }] }));
  };

  const handleRemoveRow = (index) => {
    const updatedDetails = modalData.details.filter((_, i) => i !== index);
    setModalData(prevState => ({ ...prevState, details: updatedDetails }));
  };

  const handleZoneInputChange = (e) => {
    const { name, value } = e.target;
    setModalData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const details = modalData.details.map(detail => ({
        item_id: detail.product,
        quantity: detail.quantity
      }));
      const response = await MyAxios.post("warehouse_items/inwarehouse_transaction", {
        warehouse_id: currentWarehouseId,
        source_zone: modalData.sourceZone,
        destination_zone: modalData.destinationZone,
        details
      });
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="warehouseList">
        {filteredWarehouses.length === 0 && <h3>No warehouse found</h3>}
        {filteredWarehouses.map((warehouse) => (
          <div className="card mb-3" key={warehouse.id}>
            <div className="card-header">
              <div className="d-flex mb-1 align-items-center">
                <div className="d-flex align-items-center me-4">
                  <i className="bi bi-buildings fs-3"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">{warehouse.name}</h5>
                  <small className="card-text">{"Address: "}{warehouse.address}</small>
                </div>
                <Button variant="success ms-4" onClick={() => handleOpenModal(warehouse.id)}><i className="bi bi-box-seam"/> Zone Transactions</Button>
              </div>
            </div>
            <div className="card-body">
              <ZoneList
                warehouse={warehouse}
                zoneSearchTerm={zoneSearchTerm}
                productSearchTerm={productSearchTerm}
              />
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Zone Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="sourceZone">
              <Form.Label>Source Zone</Form.Label>
              <Form.Control
                as="select"
                name="sourceZone"
                value={modalData.sourceZone}
                onChange={handleZoneInputChange}
              >
                <option value="">Select source zone</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="destinationZone" className="mb-3">
              <Form.Label>Destination Zone</Form.Label>
              <Form.Control
                as="select"
                name="destinationZone"
                value={modalData.destinationZone}
                onChange={handleZoneInputChange}
              >
                <option value="">Select destination zone</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Table bordered>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {modalData.details.map((detail, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Enter product ID"
                        name="product"
                        value={detail.product}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        name="quantity"
                        value={detail.quantity}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemoveRow(index)}>Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="secondary" onClick={handleAddRow}>Add Product</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
