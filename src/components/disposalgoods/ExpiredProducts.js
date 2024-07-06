import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import defaultProductImage from "./defaultProductImage.jpg"; // Import the default product image
import "./ExpiredProduct.css"; // Add your custom CSS file for styling

const ExpiredProduct = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExpiredProducts() {
      try {
        const response = await MyAxios.get('/products/expired');
        const expiredProducts = response.data.data;
        setExpiredProducts(expiredProducts);

        // Fetch images for each expired product
        expiredProducts.forEach(async (product) => {
          try {
            const imageResponse = await MyAxios.get(`/products/${product.id}/image`, {
              responseType: 'arraybuffer',
            });
            const base64Image = btoa(
              new Uint8Array(imageResponse.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            setProductImages((prevImages) => ({
              ...prevImages,
              [product.id]: `data:image/jpeg;base64,${base64Image}`,
            }));
          } catch (error) {
            console.error(`Error fetching image for product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error("Error fetching expired products:", error);
        setError("Failed to load expired products.");
      }
    }

    fetchExpiredProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Expired Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th style={{ textAlign: "center" }}>Image</th>
            <th>Quantity</th>
            <th>Expire Date</th>
            <th>Warehouse</th>
            <th>Zone</th>
          </tr>
        </thead>
        <tbody>
          {expiredProducts.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No expired products found</td>
            </tr>
          ) : (
            expiredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={productImages[product.id] || defaultProductImage}
                    alt="Product"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{product.quantity}</td>
                <td>{product.expire_date}</td>
                <td>{product.warehouse_name}</td>
                <td>{product.zone_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpiredProduct;
