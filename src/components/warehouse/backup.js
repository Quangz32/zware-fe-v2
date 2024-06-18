import React, { useState, useEffect } from "react";
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

  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [showEditWarehouseModal, setShowEditWarehouseModal] = useState(false);
  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [showEditZoneModal, setShowEditZoneModal] = useState(false);

  const [currentWarehouse, setCurrentWarehouse] = useState(null);
  const [currentZone, setCurrentZone] = useState(null);

  const [newWarehouse, setNewWarehouse] = useState({ name: "", address: "" });
  const [newZone, setNewZone] = useState({ warehouseId: "", name: "" });

  const handleShowAddWarehouseModal = () => setShowAddWarehouseModal(true);
  const handleCloseAddWarehouseModal = () => setShowAddWarehouseModal(false);

  const handleShowEditWarehouseModal = (warehouse) => {
    setCurrentWarehouse(warehouse);
    setNewWarehouse({ name: warehouse.name, address: warehouse.address });
    setShowEditWarehouseModal(true);
  };
  const handleCloseEditWarehouseModal = () => setShowEditWarehouseModal(false);

  const handleShowAddZoneModal = (warehouseId) => {
    setNewZone({ ...newZone, warehouseId });
    setShowAddZoneModal(true);
  };
  const handleCloseAddZoneModal = () => setShowAddZoneModal(false);

  const handleShowEditZoneModal = (zone) => {
    setCurrentZone(zone);
    setNewZone({ ...newZone, name: zone.name });
    setShowEditZoneModal(true);
  };
  const handleCloseEditZoneModal = () => setShowEditZoneModal(false);

  const handleAddWarehouse = () => {
    const newId = warehouses.length
      ? warehouses[warehouses.length - 1].id + 1
      : 1;
    setWarehouses([...warehouses, { id: newId, ...newWarehouse }]);
    handleCloseAddWarehouseModal();
  };

  const handleEditWarehouse = () => {
    const updatedWarehouses = warehouses.map((warehouse) =>
      warehouse.id === currentWarehouse.id
        ? { ...warehouse, ...newWarehouse }
        : warehouse
    );
    setWarehouses(updatedWarehouses);
    handleCloseEditWarehouseModal();
  };

  const handleAddZone = () => {
    const newId = zones.length ? zones[zones.length - 1].id + 1 : 1;
    setZones([...zones, { id: newId, ...newZone }]);
    handleCloseAddZoneModal();
  };

  const handleEditZone = () => {
    const updatedZones = zones.map((zone) =>
      zone.id === currentZone.id ? { ...zone, name: newZone.name } : zone
    );
    setZones(updatedZones);
    handleCloseEditZoneModal();
  };

  const handleDeleteZone = (zoneId) => {
    setZones(zones.filter((zone) => zone.id !== zoneId));
  };

  return (
    <div className="container pt-5">
      {/* Add and Search */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="mb-3 me-3"
          onClick={handleShowAddWarehouseModal}
        >
          <i class="bi bi-plus-circle me-1"></i>
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
            aria-label="Username"
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
                onClick={() => handleShowAddZoneModal(warehouse.id)}
              >
                Add Zone
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleShowEditWarehouseModal(warehouse)}
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
                            onClick={() => handleShowEditZoneModal(zone)}
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
      <Modal show={showAddWarehouseModal} onHide={handleCloseAddWarehouseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Warehouse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                value={newWarehouse.name}
                onChange={(e) =>
                  setNewWarehouse({ ...newWarehouse, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Warehouse Address</Form.Label>
              <Form.Control
                type="text"
                value={newWarehouse.address}
                onChange={(e) =>
                  setNewWarehouse({ ...newWarehouse, address: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddWarehouseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddWarehouse}>
            Save Warehouse
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Warehouse Modal */}
      <Modal
        show={showEditWarehouseModal}
        onHide={handleCloseEditWarehouseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Warehouse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                value={newWarehouse.name}
                onChange={(e) =>
                  setNewWarehouse({ ...newWarehouse, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Warehouse Address</Form.Label>
              <Form.Control
                type="text"
                value={newWarehouse.address}
                onChange={(e) =>
                  setNewWarehouse({ ...newWarehouse, address: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditWarehouseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditWarehouse}>
            Update Warehouse
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Zone Modal */}
      <Modal show={showAddZoneModal} onHide={handleCloseAddZoneModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Zone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Zone Name</Form.Label>
              <Form.Control
                type="text"
                value={newZone.name}
                onChange={(e) =>
                  setNewZone({ ...newZone, name: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddZoneModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddZone}>
            Save Zone
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Zone Modal */}
      <Modal show={showEditZoneModal} onHide={handleCloseEditZoneModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Zone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Zone Name</Form.Label>
              <Form.Control
                type="text"
                value={newZone.name}
                onChange={(e) =>
                  setNewZone({ ...newZone, name: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditZoneModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditZone}>
            Update Zone
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarehouseManagement;
