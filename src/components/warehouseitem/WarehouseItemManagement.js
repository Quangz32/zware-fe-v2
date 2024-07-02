
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../../mystyle.css";
import WarehouseList from "./WarehouseList";
// import SearchBar from "./SearchBar";
// import ZoneList from "../warehouse/ZoneList";
import SearchPage from "./SearchPage";

const WarehouseItemManagement = () => {
  const [listRender, setListRender] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const defaultWarehouse = {
    id: 0,
    name: "",
    address: "",
  };

  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    if (showWarehouseModal === false) setListRender((p) => !p);
  }, [showWarehouseModal]);

  return (
    <div className="container">
      <SearchPage onSearchResults={handleSearchResults} />
      <WarehouseList searchTerm={searchTerm} render={listRender} searchResults={searchResults} />
      
    </div>
  );
};

export default WarehouseItemManagement;
