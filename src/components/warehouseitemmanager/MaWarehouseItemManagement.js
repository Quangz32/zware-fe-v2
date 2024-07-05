import React, { useState } from "react";
import WarehouseList from "./WarehouseList";

const WarehouseItemManagement = () => {
  const [listRender, setListRender] = useState(true);
  const [warehouseSearchTerm, setWarehouseSearchTerm] = useState("");
  const [zoneSearchTerm, setZoneSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");

  const handleWarehouseSearchChange = (e) => {
    setWarehouseSearchTerm(e.target.value);
  };

  const handleZoneSearchChange = (e) => {
    setZoneSearchTerm(e.target.value);
  };

  const handleProductSearchChange = (e) => {
    setProductSearchTerm(e.target.value);
  };

  return (
    <>
    <h1 className="container text-center">Warehouse Item</h1>
    <div className="container">
     <div className="container">
  <div className="search-bar">
    <div className="row p-3">
      {/* Zone Search */}
      <div className="col-md-6 p-1">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text"> Zone</span>
          </div>
          <input
            type="text"
            placeholder="Search Zone"s
            value={zoneSearchTerm}
            onChange={handleZoneSearchChange}
            className="form-control"
          />
        </div>
      </div>
      {/* Product Search */}
      <div className="col-md-6 p-1">
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
      </div>
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
