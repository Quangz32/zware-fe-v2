import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import "../../mystyle.css";

export default function WarehouseList(props) {
  //useState HOOKS for data
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

  //useEffect HOOK
  useEffect(() => {
    fetchData();
  }, [props.updateTrigger]);

  //Filt Warehouse befor render
  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(props.searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Warehouse List */}
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
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Zones:</h6>
              <table className="table">
                <tbody>
                  {warehouse.zones &&
                    // .filter((zone) => zone.warehouse_id === warehouse.id)
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
    </>
  );
}
