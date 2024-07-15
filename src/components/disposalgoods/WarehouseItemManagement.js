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

  return (
    <>
      {/* <h1 className="container text-center">Disposal Goods</h1> */}
      <div className="container">
        <div className="container">
          <div className="search-bar">
            <div className="row p-3">
             
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
