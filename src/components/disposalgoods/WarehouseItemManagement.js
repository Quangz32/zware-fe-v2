import React, { useState } from "react";
import WarehouseList from "./WarehouseList";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WarehouseItemManagement = () => {
  const [listRender, setListRender] = useState(true);
  const [warehouseSearchTerm, setWarehouseSearchTerm] = useState("");
  const [zoneSearchTerm, setZoneSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleWarehouseSearchChange = (e) => {
    setWarehouseSearchTerm(e.target.value);
  };

  const handleZoneSearchChange = (e) => {
    setZoneSearchTerm(e.target.value);
  };

  const handleProductSearchChange = (e) => {
    setProductSearchTerm(e.target.value);
  };

  const handleCreateDisposal = () => {
    navigate("/create-disposal");
  };

  return (
    <>
      {/* <h1 className="container text-center">Disposal Goods</h1> */}
      <div className="container">
        <div className="container">
          <div className="search-bar">
            <div className="row p-3">
              <Button className="col-md-2" variant="primary" onClick={handleCreateDisposal}>
                Create Disposal
              </Button>
              {/* Warehouse Search */}
              {/* <div className="col-md-4 p-1">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Warehouse</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Warehouse"
                    value={warehouseSearchTerm}
                    onChange={handleWarehouseSearchChange}
                    className="form-control"
                  />
                </div>
              </div> */}
              {/* Zone Search */}
              {/* <div className="col-md-4 p-1">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Zone</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Zone"
                    value={zoneSearchTerm}
                    onChange={handleZoneSearchChange}
                    className="form-control"
                  />
                </div>
              </div> */}
              {/* Product Search */}
              {/* <div className="col-md-4 p-1">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Product</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search Product"
                    value={productSearchTerm}
                    onChange={handleProductSearchChange}
                    className="form-control"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <WarehouseList
          warehouseSearchTerm={warehouseSearchTerm}
          zoneSearchTerm={zoneSearchTerm}
          productSearchTerm={productSearchTerm}
          render={listRender}
        />
      </div>
    </>
  );
};

export default WarehouseItemManagement;
