import React from "react";

const SearchBar = ({
  onWarehouseSearchChange,
  onZoneSearchChange,
  onProductSearchChange,
  onSearch,
  onClear,
}) => {
  return (
    <div className="container">
      <div className="row p-3">
        {/* Warehouse Search */}
        <div className="col-md-3 p-1">
          <div className="input-group search-bar">
            <div className="input-group-prepend">
              <span className="input-group-text">Warehouse</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search for warehouse..."
              onChange={onWarehouseSearchChange}
            />
          </div>
        </div>

        {/* Zone Search */}
        <div className="col-md-3 p-1">
          <div className="input-group search-bar">
            <div className="input-group-prepend">
              <span className="input-group-text">Zone</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search for zone..."
              onChange={onZoneSearchChange}
            />
          </div>
        </div>

        {/* Product Search */}
        <div className="col-md-3 p-1">
          <div className="input-group search-bar">
            <div className="input-group-prepend">
              <span className="input-group-text">Product</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search for product..."
              onChange={onProductSearchChange}
            />
          </div>
        </div>

        {/* Search and Clear Buttons */}
        <div className="col-md-3 p-1">
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary mr-2" type="button" onClick={onSearch}>
              <i className="bi bi-search"></i> Search
            </button>
            <button className="btn btn-outline-secondary" type="button" onClick={onClear}>
              <i className="bi bi-trash"></i> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
