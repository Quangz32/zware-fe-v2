import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import "./WarehouseItemList.css";
import MyAlert from "./MyAlert"; // Import your alert component

const WarehouseItemList = ({ zoneId }) => {
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchWarehouseItems() {
      try {
        const response = await MyAxios.get(`/warehouses/${zoneId}/items`);
        if (Array.isArray(response.data.data)) {
          setWarehouseItems(response.data.data);
        } else {
          console.error("Dữ liệu từ API không phải là một mảng:", response.data);
          setWarehouseItems([]);
        }
      } catch (error) {
        console.error("Lỗi khi fetch warehouse items:", error);
        setWarehouseItems([]);
      }
    }

    async function fetchItems() {
      try {
        const response = await MyAxios.get('/items');
        if (Array.isArray(response.data.data)) {
          setItems(response.data.data);
        } else {
          console.error("Dữ liệu từ API không phải là một mảng:", response.data);
          setItems([]);
        }
      } catch (error) {
        console.error("Lỗi khi fetch items:", error);
        setItems([]);
      }
    }

    async function fetchProducts() {
      try {
        const response = await MyAxios.get('/products');
        if (Array.isArray(response.data.data)) {
          const products = response.data.data;
          setProducts(products);

          // Fetch images for each product
          products.forEach(async (product) => {
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
        } else {
          console.error("Dữ liệu từ API không phải là một mảng:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi fetch products:", error);
        setProducts([]);
      }
    }

    async function fetchData() {
      setLoading(true);
      await fetchWarehouseItems();
      await fetchItems();
      await fetchProducts();
      setLoading(false);
    }

    fetchData();
  }, [zoneId]);

  useEffect(() => {
    const checkExpiredProducts = () => {
      const today = new Date();
      const expired = warehouseItems.filter((warehouseItem) => {
        const item = getItemById(warehouseItem.item_id);
        const expireDate = new Date(item.expire_date);
        return expireDate < today;
      });
      setExpiredProducts(expired);
      if (expired.length > 0) {
        setShowAlert(true);
      }
    };

    checkExpiredProducts();
  }, [warehouseItems, items]);

  const getItemById = (itemId) => {
    return items.find(item => item.id === itemId) || {};
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId) || {};
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = warehouseItems.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(warehouseItems.length / itemsPerPage);

  return (
    <>
      {showAlert && (
        <MyAlert
          message={`Today, there are ${expiredProducts.length} expired products.`}
          variant="danger"
          show={showAlert}
          setShow={setShowAlert}
          link="/create-cancellation-form" // Link to the cancellation form page
        />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Expire Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((warehouseItem) => {
            const item = getItemById(warehouseItem.item_id);
            const product = getProductById(item.product_id);
            if (!product.name) {
              return null; // Skip if product details are not available
            }
            const productImageUrl = productImages[product.id]; // Get the image URL from state
            return (
              <tr key={warehouseItem.id}>
                <td>{product.name}</td>
                <td>
                  {productImageUrl ? (
                    <img
                      src={productImageUrl}
                      alt="Product"
                      style={{ width: "50px", height: "50px", display: "block", margin: "0 auto" }}
                    />
                  ) : (
                    "Loading..."
                  )}
                </td>
                <td style={{ textAlign: "center" }}>{warehouseItem.quantity}</td>
                <td>{item.expire_date}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination-wrapper">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
        <div className="total-pages">
          Page {currentPage} of {totalPages}
        </div>
      </div>
      <h3>Expired Products</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Expire Date</th>
          </tr>
        </thead>
        <tbody>
          {expiredProducts.map((warehouseItem) => {
            const item = getItemById(warehouseItem.item_id);
            const product = getProductById(item.product_id);
            const productImageUrl = productImages[product.id];
            return (
              <tr key={warehouseItem.id}>
                <td>{product.name}</td>
                <td>
                  {productImageUrl ? (
                    <img
                      src={productImageUrl}
                      alt="Product"
                      style={{ width: "50px", height: "50px", display: "block", margin: "0 auto" }}
                    />
                  ) : (
                    "Loading..."
                  )}
                </td>
                <td style={{ textAlign: "center" }}>{warehouseItem.quantity}</td>
                <td>{item.expire_date}</td>
              </tr>
);
})}
</tbody>
</Table>
</>
);
};

export default WarehouseItemList;
