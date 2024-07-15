
import React, { useState, useEffect } from "react";
import MyAxios from "../../util/MyAxios";
import ZoneList from "./ZoneList";

export default function WarehouseList({ warehouseSearchTerm, zoneSearchTerm, productSearchTerm, render }) {
  const [warehouses, setWarehouses] = useState([]);
  const [userWarehouseId, setUserWarehouseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ type: null, message: "" });

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

  // Effect to fetch user and user-managed warehouses on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Effect to fetch user-managed warehouses based on search terms and dependencies
  useEffect(() => {
    if (!warehouseSearchTerm && !zoneSearchTerm && !productSearchTerm) {
      fetchUserWarehouse(userWarehouseId);
    }
  }, [warehouseSearchTerm, zoneSearchTerm, productSearchTerm, userWarehouseId, render, updating]);

  // Function to handle removing expired products from warehouse
  const removeExpiredProducts = async (warehouseId) => {
    try {
      setLoading(true);
      const response = await MyAxios.post(`/disposed_goods/remove_expire_product_by_warehouse/${warehouseId}`);
      console.log(`Expired products removed for warehouse ID ${warehouseId}`);
      setAlert({ type: 'success', message: 'Expired products removed successfully!' });
      setUpdating(true); // Trigger re-render
    } catch (error) {
      console.error(`Error removing expired products for warehouse ID ${warehouseId}:`, error);
      setAlert({ type: 'danger', message: 'Failed to remove expired products. Please try again.' });
    } finally {
      setLoading(false);
      setShowModal(false); // Close the confirmation modal
      // Reload the page after updating
      window.location.reload();
    }
  };

  // Function to filter warehouses based on search term
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
                  <small className="card-text">Address: {warehouse.address}</small>
                </div>
              </div>
              <div className="mt-3">
                {/* Example of Remove button */}
                <button
                  className="btn btn-danger"
                  onClick={() => setShowModal(true)}
                >
                  Remove Expired Products
                </button>
                {/* Confirmation Modal */}
                {showModal && (
                  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Confirm Removal</h5>
                          <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                          <p>Are you sure you want to remove expired products from {warehouse.name}?</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                          <button type="button" className="btn btn-danger" onClick={() => { removeExpiredProducts(warehouse.id); }}>Confirm</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* End Confirmation Modal */}
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
