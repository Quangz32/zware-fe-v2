import React from "react";
import ProductImage from "./productExample.jpeg";

const infoStyle = {
  color: "#666",
  padding: "0px 0px",
};
export default function ProductCard(props) {
  return (
    <>
      <div className="col-md-3 mb-3">
        <div className="card">
          <img src={ProductImage} alt="Product Image"></img>
          <div className="card-body">
            <h6 className="card-title mb-1">{props.product.name}</h6>
            <div className="row mb-2 px-2">
              <small className="col-lg-6" style={infoStyle}>
                <i className="bi bi-bookmark me-1"></i>
                {props.product.category}
              </small>
              <small className="col-lg-6" style={infoStyle}>
                <i className="bi bi-box-seam me-1"></i>
                {props.product.supplier}
              </small>
              <small className="col-lg-6" style={infoStyle}>
                <i className="bi bi-rulers me-1"></i>
                {props.product.measureUnit}
              </small>
            </div>
            {/* Options */}
            <div className="text-center">
              <button className="btn btn-warning btn-sm mx-1">Edit</button>
              <button className="btn btn-danger btn-sm mx-1">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
