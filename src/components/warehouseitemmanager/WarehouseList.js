import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import ZoneList from "./ZoneList";

export default function WarehouseList({ warehouseSearchTerm, zoneSearchTerm, productSearchTerm, render }) {
  const [warehouses, setWarehouses] = useState([]);
  const [userWarehouseId, setUserWarehouseId] = useState(null);

  // Fetch user-managed warehouse
  async function fetchUserWarehouse(userId) {
    try {
      const response = await MyAxios.get(`/users/${userId}/warehouse`);
      const tempData = response.data.data;
      setWarehouses([tempData]); // Assuming the endpoint returns a single warehouse
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch user info
  async function fetchUser() {
    try {
      const response = await MyAxios.get("/users/me");
      const userData = response.data.data;
      setUserWarehouseId(userData.warehouse_id);
      fetchUserWarehouse(userData.id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!warehouseSearchTerm && !zoneSearchTerm && !productSearchTerm) {
      fetchUserWarehouse(userWarehouseId);
    }
  }, [warehouseSearchTerm, zoneSearchTerm, productSearchTerm, userWarehouseId, render]);

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(warehouseSearchTerm.toLowerCase())
  );

  return (
    <>
      <div id="warehouseList">
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
                  <small className="card-text">{"Address: "}{warehouse.address}</small>
                </div>
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
    </>
  );
}
