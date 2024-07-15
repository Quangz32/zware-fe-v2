import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import ZoneList from "./ZoneList";
import { Button, Modal, Form, Table } from "react-bootstrap";
import MyAlert from "../share/MyAlert"; // Import MyAlert component

export default function WarehouseList({ warehouseSearchTerm, zoneSearchTerm, productSearchTerm, render }) {
  const [warehouses, setWarehouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [products, setProducts] = useState([]);
  const [expirationDates, setExpirationDates] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ sourceZone: "", destinationZone: "", details: [{ productID: "", expirationDate: "", quantity: 0 }] });
  const [currentWarehouseId, setCurrentWarehouseId] = useState(null);
  
  // Alert states
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

  // Fetch products with expiration dates
  async function fetchProducts() {
    try {
      const response = await MyAxios.get("/products");
      const tempData = response.data.data;
      setProducts(tempData);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch expiration dates for a specific product
  async function fetchExpirationDatesByProduct(productId) {
    try {
      const response = await MyAxios.get(`/items?product_id=${productId}`);
      const tempData = response.data.data;
      setExpirationDates(prevState => ({ ...prevState, [productId]: tempData }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWarehouses();
    fetchProducts();
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

    // Fetch expiration dates if a product is selected
    if (name === "productID" && value) {
      fetchExpirationDatesByProduct(value);
    } else if (name === "productID" && !value) {
      // Reset expiration dates when product is deselected
      setExpirationDates(prevState => ({ ...prevState, [modalData.details[index].productID]: [] }));
    }
  };

  const handleAddRow = () => {
    setModalData(prevState => ({ ...prevState, details: [...prevState.details, { productID: "", expirationDate: "", quantity: 0 }] }));
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
      const details = modalData.details.map(detail => {
        let itemId = `${detail.productID}-${detail.expirationDate}`;
        const matchingExpirationDate = expirationDates[detail.productID]?.find(date => date.expire_date === detail.expirationDate);
        if (matchingExpirationDate) {
          itemId = matchingExpirationDate.id; // Use the ID from expirationDates if there's a match
        }
        return {
          item_id: itemId,
          quantity: detail.quantity
        };
      });
  
      const response = await MyAxios.post("warehouse_items/inwarehouse_transaction", {
        warehouse_id: currentWarehouseId,
        source_zone: modalData.sourceZone,
        destination_zone: modalData.destinationZone,
        details
      });
  
      console.log(response.data);
      handleCloseModal();
  
      // Set alert message and variant
      setAlertMessage("Transaction submitted successfully");
      setAlertVariant("success");
      setShowAlert(true); // Show the alert
  
      // Wait 1.5 seconds then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      // Set alert message and variant for error handling
      setAlertMessage("Failed to submit transaction");
      setAlertVariant("danger");
      setShowAlert(true); // Show the alert
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

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-lg">
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
                  <th>Expiration Date</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {modalData.details.map((detail, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        as="select"
                        name="productID"
                        value={detail.productID}
                        onChange={(e) => handleInputChange(e, index)}
                      >
                        <option value="">Select product</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                      </Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        as="select"
                        name="expirationDate"
                        value={detail.expirationDate}
                        onChange={(e) => handleInputChange(e, index)}
                        disabled={!detail.productID} // Disable if productID is not selected
                      >
                        <option value="">Select expiration date</option>
                        {(expirationDates[detail.productID] || []).map((date, idx) => (
                          <option key={idx} value={date.expire_date}>{date.expire_date}</option>
                        ))}
                      </Form.Control>
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
            <Button variant="secondary" onClick={handleAddRow}>Add Row</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit Transaction</Button>
        </Modal.Footer>
      </Modal>

      {/* Render MyAlert component */}
      <MyAlert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        setShow={setShowAlert}
      />
    </>
  );
}
