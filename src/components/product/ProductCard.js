import React, { useEffect, useState } from "react";
import ProductImage from "./productExample.jpeg";
import MyAxios from "../../util/MyAxios";

export default function ProductCard(props) {
  // console.log("HEllo catd");
  const infoStyle = {
    color: "#666",
    padding: "0px 0px",
    // fontSize: "12px"
  };

  //It will add category_name attribute
  const [product, setProduct] = useState(props.product);

  useEffect(() => {
    const setCategoryName = async () => {
      await MyAxios.get(`categories/${props.product.category_id}`)
        .then((res) => {
          const categoryName = res.data.data.name;
          setProduct((prevProduct) => ({
            ...prevProduct,
            category_name: categoryName,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    };

    setCategoryName();
  }, [props]);

  return (
    product && (
      <>
        <div className="col-md-3 mb-3">
          <div className="card">
            <img src={ProductImage} alt="Product"></img>
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
                <button className="btn btn-warning btn-sm mx-1">Edit</button>
                <button className="btn btn-danger btn-sm mx-1">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
