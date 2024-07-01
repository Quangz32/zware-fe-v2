import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../mystyle.css";
import WarehouseList from "./WarehouseList";
// import WarehouseForm from "./WarehouseForm";
import SearchBar from "./SearchBar";
import ZoneList from "../warehouse/ZoneList";
const WarehouseItemManagement = () => {
  const [listRender, setListRender] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Warehouse Form (Modal)
  const defaultWarehouse = {
    id: 0,
    name: "",
    address: "",
  };

  // const [warehouseModalMode, setWarehouseModalMode] = useState(""); // "edit" or "add"
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  // const [warehouseModalWarehouse, setWarehouseModalWarehouse] =
    useState(defaultWarehouse);

    const [warehouseSearchTerm, setWarehouseSearchTerm] = useState('');
    const [zoneSearchTerm, setZoneSearchTerm] = useState('');
    const [productSearchTerm, setProductSearchTerm] = useState('');
  
    const handleWarehouseSearchChange = (event) => {
      setWarehouseSearchTerm(event.target.value);
    };
  
    const handleZoneSearchChange = (event) => {
      setZoneSearchTerm(event.target.value);
    };
  
    const handleProductSearchChange = (event) => {
      setProductSearchTerm(event.target.value);
    };
  
    const handleSearch = () => {
      // Logic for handling search
    };
  
    const handleClear = () => {
      // Logic for clearing search
    };
  
  useEffect(() => {
    if (showWarehouseModal === false) setListRender((p) => !p);
  }, [showWarehouseModal]);

  return (
    <div className="container">
     <SearchBar
        onWarehouseSearchChange={handleWarehouseSearchChange}
        onZoneSearchChange={handleZoneSearchChange}
        onProductSearchChange={handleProductSearchChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />
     
      <WarehouseList searchTerm={searchTerm} render={listRender} />
{/* <ZoneList></ZoneList> */}
     
    </div>
  );
};

export default WarehouseItemManagement;
