import React, { useState, useEffect } from "react";
// import ProductImage from "./productExample.jpeg";
import defaultProductImage from "./defaultProductImage.jpg";
import axios from "axios";

//Props contains: product, setShowForm, setFormMode, setFormData
export default function ProductCard(props) {
  const infoStyle = {
    color: "#666",
    padding: "0px 0px",
    // fontSize: "12px"
  };

  const product = props.product;

  const [imageData, setImageData] = useState("");

  //Get image data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:2000/api/products/${product.id}/image`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer", // Yêu cầu phản hồi dưới dạng mảng byte (arraybuffer)
        })
        .then((res) => {
          if (res.status === 200) {
            const base64Image = btoa(
              new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
            );
            setImageData(`data:image/jpeg;base64, ${base64Image}`);
          }
        })
        .catch((e) => {
          // console.log(e);
        });
    };

    fetchData();
  }, [props, product]);

  return (
    product && (
      <>
        {/* <div className="col-md-3 mb-3"> */}
        <div className="card">
          <img
            src={imageData !== "" ? imageData : defaultProductImage}
            height={"160"}
            alt="Product"
          ></img>
          <div className="card-body">
            <h6 className="card-title mb-1">{product.name}</h6>
            <div className="row mb-2 px-2">
              <small className="col-xl-6" style={infoStyle}>
                <i className="bi bi-bookmark me-1"></i>
                {product.category_name}
              </small>
              <small className="col-xl-6" style={infoStyle}>
                <i className="bi bi-box-seam me-1"></i>
                {product.supplier}
              </small>
              <small className="col-xl-6" style={infoStyle}>
                <i className="bi bi-rulers me-1"></i>
                {product.measure_unit}
              </small>
            </div>
            {/* Options */}
            <div className="text-center">
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => {
                  props.setFormMode("edit");
                  props.setFormData(product);
                  props.setShowForm(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm mx-1"
                onClick={() => {
                  props.setShowDeleteProduct(true);
                  props.setProductToDelete(product);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </>
    )
  );
}
