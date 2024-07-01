import React, { useState, useEffect } from "react";

import MyAxios from "../../util/MyAxios";

import ZoneList from "./ZoneList";
export default function WarehouseList({ searchTerm, render }) {

  const [warehouses, setWarehouses] = useState([]);

  // Fetch warehouses and zones from DB
  async function fetchData() {
    try {
      const response = await MyAxios.get("warehouses");
      const tempData = response.data.data;

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



  //Filt warehouse by Props: searchTerm
  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Re-render when update render of WarehouseManagement
  useEffect(() => {
    fetchData();
  }, [render]);



  //Rerender when edit warehouse
  useEffect(() => {
    if (showWarehouseModal === false) fetchData();
  }, [showWarehouseModal]);

  return (
    <>
      <div id="warehouseList">
        {/* {render ? "T" : "F"} */}
        {filteredWarehouses.length === 0 && <h3>No warehouse found</h3>}
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

            </div>
            <div className="card-body">
              <ZoneList warehouse={warehouse}></ZoneList>
              {/* <WarehouseItemList warehouse={warehouse}></WarehouseItemList> */}
              {/* <WarehouseItemList></WarehouseItemList> */}
            </div>
          </div>
        ))}
      </div>

     
    </>
  );
}
