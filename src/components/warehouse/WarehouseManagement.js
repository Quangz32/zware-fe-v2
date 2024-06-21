import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../mystyle.css";
import WarehouseList from "./WarehouseList";
import WarehouseForm from "./WarehouseForm";

const WarehouseManagement = () => {
  const [listRender, setListRender] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Warehouse Form (Modal)
  const defaultWarehouse = {
    id: 0,
    name: "",
    address: "",
  };

  const [warehouseModalMode, setWarehouseModalMode] = useState(""); // "edit" or "add"
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [warehouseModalWarehouse, setWarehouseModalWarehouse] =
    useState(defaultWarehouse);

  const handleAddNewWarehouse = () => {
    setWarehouseModalMode("add");
    setWarehouseModalWarehouse(defaultWarehouse);
    setShowWarehouseModal(true);
  };

  //Rerender WarehouseList when close Add Warehouse
  useEffect(() => {
    if (showWarehouseModal === false) setListRender((p) => !p);
  }, [showWarehouseModal]);

  return (
    <div className="container">
      {/* {"ShowWarehouseModal: "}
      {showWarehouseModal ? "T" : "F"} */}
      {/* Add and Search */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="mb-3 me-3"
          onClick={handleAddNewWarehouse}
        >
          <i className="bi bi-plus-circle me-1"></i>
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
            placeholder="Search warehouse"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </span>
      </div>

      {/* Warehouse List (Table) */}
      <WarehouseList searchTerm={searchTerm} render={listRender} />

      {/* Warehouse Form (Modal) */}
      <WarehouseForm
        mode={warehouseModalMode}
        warehouse={warehouseModalWarehouse}
        show={showWarehouseModal}
        setShow={setShowWarehouseModal}
      />
    </div>
  );
};

export default WarehouseManagement;
