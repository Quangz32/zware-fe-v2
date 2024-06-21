import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import DeleteWarehouse from "./DeleteWarehouse";
import WarehouseForm from "./WarehouseForm";
import ZoneList from "./ZoneList";

export default function WarehouseList({ searchTerm, render }) {
  // console.log("Render in List");
  // console.log(render);
  const [warehouses, setWarehouses] = useState([]);

  // Fetch warehouses and zones from DB
  async function fetchData() {
    try {
      const response = await MyAxios.get("warehouses");
      const tempData = response.data.data;

      // const fetchZonePromises = tempData.map((warehouse) =>
      //   MyAxios.get(`warehouses/${warehouse.id}/zones`)
      // );

      // const zoneResponses = await Promise.all(fetchZonePromises);
      // const updatedWarehouses = tempData.map((warehouse, index) => ({
      //   ...warehouse,
      //   zones: zoneResponses[index].data.data,
      // }));

      // console.log(updatedWarehouses);
      setWarehouses(tempData);
    } catch (error) {
      console.log(error);
    }
  }

  //Warehouse Form (Modal)
  const defaultWarehouse = {
    id: 0,
    name: "",
    address: "",
  };
  const [warehouseModalMode, setWarehouseModalMode] = useState(""); //"edit" or "add"
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [warehouseModalWarehouse, setWarehouseModalWarehouse] =
    useState(defaultWarehouse);

  const handleEditWarehouse = (warehouse) => {
    setWarehouseModalMode("edit");
    setWarehouseModalWarehouse(warehouse);
    setShowWarehouseModal(true);
  };

  //DELETE Warehouse (Confirm)
  const [showDeleteWarehouse, setShowDeleteWarehouse] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState(null);

  const handleDeleteWarehouse = (warehouse) => {
    setWarehouseToDelete(warehouse);
    setShowDeleteWarehouse(true);
  };

  //Filt warehouse by Props: searchTerm
  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Re-render when update render of WarehouseManagement
  useEffect(() => {
    fetchData();
  }, [render]);

  //Rerender when delete warehouse
  useEffect(() => {
    if (showDeleteWarehouse === false) fetchData();
  }, [showDeleteWarehouse]);

  //Rerender when edit warehouse
  useEffect(() => {
    if (showWarehouseModal === false) fetchData();
  }, [showWarehouseModal]);

  return (
    <>
      <div id="warehouseList">
        {/* {render ? "T" : "F"} */}
        {filteredWarehouses.length === 0 && <h3>No warehouses found</h3>}
        {filteredWarehouses.map((warehouse) => (
          <div className="card mb-3" key={warehouse.id}>
            <div className="card-header">
              <div className="d-flex mb-1">
                <div className="d-flex align-items-center me-4">
                  <i className="bi bi-buildings fs-3"></i>
                </div>
                <div>
                  <h5 className="card-title mb-0">{warehouse.name}</h5>
                  <small className="card-text">
                    {"Address: "}
                    {warehouse.address}
                  </small>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  handleEditWarehouse(warehouse);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => {
                  handleDeleteWarehouse(warehouse);
                }}
              >
                Delete
              </Button>
            </div>
            <div className="card-body">
              <ZoneList warehouse={warehouse}></ZoneList>
            </div>
          </div>
        ))}
      </div>

      {/* Warehouse Form (Modal) */}
      <WarehouseForm
        mode={warehouseModalMode}
        warehouse={warehouseModalWarehouse}
        show={showWarehouseModal}
        setShow={setShowWarehouseModal}
      ></WarehouseForm>

      {warehouseToDelete && (
        <DeleteWarehouse
          warehouse={warehouseToDelete}
          show={showDeleteWarehouse}
          setShow={setShowDeleteWarehouse}
        />
      )}
    </>
  );
}
