import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import "../../mystyle.css";
import DeleteWarehouse from "./DeleteWarehouse";

export default function WarehouseList(props) {
  const [warehouses, setWarehouses] = useState([]);

  // Fetch warehouses and zones from DB
  async function fetchData() {
    try {
      const response = await MyAxios.get("warehouses");
      const tempData = response.data.data;

      const fetchZonePromises = tempData.map((warehouse) =>
        MyAxios.get(`warehouses/${warehouse.id}/zones`)
      );

      const zoneResponses = await Promise.all(fetchZonePromises);
      const updatedWarehouses = tempData.map((warehouse, index) => ({
        ...warehouse,
        zones: zoneResponses[index].data.data,
      }));

      setWarehouses(updatedWarehouses);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [props.updateTrigger, warehouses]);

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  const [showDeleteWarehouse, setShowDeleteWarehouse] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const handleDeleteClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowDeleteWarehouse(true);
    fetchData();
  };

  return (
    <>
      <div id="warehouseList">
        {filteredWarehouses.length === 0 && <h3>No warehouses found</h3>}
        {filteredWarehouses.map((warehouse) => (
          <div className="card mb-3" key={warehouse.id}>
            <div className="card-header">
              <h5 className="card-title">{warehouse.name}</h5>
              <p className="card-text">{warehouse.address}</p>
              <Button variant="primary" size="sm" className="me-2">
                Add Zone
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  props.handleOpenWarehouseModal("edit", warehouse)
                }
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => handleDeleteClick(warehouse)}
              >
                Delete
              </Button>
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Zones:</h6>
              <table className="table">
                <tbody>
                  {warehouse.zones &&
                    warehouse.zones.map((zone) => (
                      <tr key={zone.id} className="row">
                        <td className="col">{zone.name}</td>
                        <td className="col">
                          <Button
                            variant="outline-primary"
                            className="me-2"
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button variant="outline-danger" size="sm">
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
      {selectedWarehouse && (
        <DeleteWarehouse
          warehouse={selectedWarehouse}
          show={showDeleteWarehouse}
          setShow={setShowDeleteWarehouse}
        />
      )}
    </>
  );
}
