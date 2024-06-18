import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../mystyle.css";

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: "Warehouse A", address: "123 Main St" },
    { id: 2, name: "Warehouse B", address: "456 Oak Ave" },
  ]);

  const [zones, setZones] = useState([
    { id: 1, warehouseId: 1, name: "Zone 1" },
    { id: 2, warehouseId: 1, name: "Zone 2" },
    { id: 3, warehouseId: 2, name: "Zone 1" },
  ]);

  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);

  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [currentZone, setCurrentZone] = useState(null);

  const [warehouseForm, setWarehouseForm] = useState({ name: "", address: "" });
  const [zoneForm, setZoneForm] = useState({ warehouseId: "", name: "" });

  const handleShowWarehouseModal = (warehouse = null) => {
    setCurrentWarehouse(warehouse);
    setWarehouseForm(
      warehouse
        ? { name: warehouse.name, address: warehouse.address }
        : { name: "", address: "" }
    );
    setShowWarehouseModal(true);
  };
  const handleCloseWarehouseModal = () => setShowWarehouseModal(false);

  const handleShowZoneModal = (zone = null, warehouseId = null) => {
    setCurrentZone(zone);
    setZoneForm(
      zone
        ? { name: zone.name, warehouseId: zone.warehouseId }
        : { name: "", warehouseId }
    );
    setShowZoneModal(true);
  };
  const handleCloseZoneModal = () => setShowZoneModal(false);

  const handleSaveWarehouse = () => {
    if (currentWarehouse) {
      const updatedWarehouses = warehouses.map((warehouse) =>
        warehouse.id === currentWarehouse.id
          ? { ...warehouse, ...warehouseForm }
          : warehouse
      );
      setWarehouses(updatedWarehouses);
    } else {
      const newId = warehouses.length
        ? warehouses[warehouses.length - 1].id + 1
        : 1;
      setWarehouses([...warehouses, { id: newId, ...warehouseForm }]);
    }
    handleCloseWarehouseModal();
  };

  const handleSaveZone = () => {
    if (currentZone) {
      const updatedZones = zones.map((zone) =>
        zone.id === currentZone.id ? { ...zone, name: zoneForm.name } : zone
      );
      setZones(updatedZones);
    } else {
      const newId = zones.length ? zones[zones.length - 1].id + 1 : 1;
      setZones([...zones, { id: newId, ...zoneForm }]);
    }
    handleCloseZoneModal();
  };

  const handleDeleteZone = (zoneId) => {
    setZones(zones.filter((zone) => zone.id !== zoneId));
  };

  //ALERT
  const [showAlert, setShowAlert] = useState(false);
  const triggerAlert = () => {
    setShowAlert(true);
  };
  //#ALERT

  return (
    <div className="container">
      {/* Add and Search */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="mb-3 me-3"
          onClick={() => handleShowWarehouseModal()}
        >
          <i className="bi bi-plus-circle me-1"></i>
          New Warehouse
        </Button>

        <span className="input-group mb-3 w-25">
          <span
            className="input-group-text my-cursor-pointer"
            id="basic-addon1"
          >
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Type something"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </span>
      </div>

      {/* Warehouse List */}
      <div id="warehouseList">
        {warehouses.map((warehouse) => (
          <div className="card mb-3" key={warehouse.id}>
            <div className="card-header">
              <h5 className="card-title">{warehouse.name}</h5>
              <p className="card-text">{warehouse.address}</p>
              <Button
                variant="primary"
                size="sm"
                className="me-2"
                onClick={() => handleShowZoneModal(null, warehouse.id)}
              >
                Add Zone
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleShowWarehouseModal(warehouse)}
              >
                Edit
              </Button>
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Zones:</h6>
              <table className="table">
                <tbody>
                  {zones
                    .filter((zone) => zone.warehouseId === warehouse.id)
                    .map((zone) => (
                      <tr key={zone.id} className="row">
                        <td className="col">{zone.name}</td>
                        <td className="col">
                          <Button
                            variant="outline-primary"
                            className="me-2"
                            size="sm"
                            onClick={() => handleShowZoneModal(zone)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteZone(zone.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add/Edit Warehouse */}
      <Modal show={showWarehouseModal} onHide={handleCloseWarehouseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentWarehouse ? "Edit Warehouse" : "Add New Warehouse"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                value={warehouseForm.name}
                onChange={(e) =>
                  setWarehouseForm({ ...warehouseForm, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Warehouse Address</Form.Label>
              <Form.Control
                type="text"
                value={warehouseForm.address}
                onChange={(e) =>
                  setWarehouseForm({
                    ...warehouseForm,
                    address: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarehouseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveWarehouse}>
            {currentWarehouse ? "Update Warehouse" : "Save Warehouse"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Zone Modal */}
      <Modal show={showZoneModal} onHide={handleCloseZoneModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentZone ? "Edit Zone" : "Add Zone"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Zone Name</Form.Label>
              <Form.Control
                type="text"
                value={zoneForm.name}
                onChange={(e) =>
                  setZoneForm({ ...zoneForm, name: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseZoneModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveZone}>
            {currentZone ? "Update Zone" : "Save Zone"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarehouseManagement;
