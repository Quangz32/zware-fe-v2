import React, { useEffect, useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import MyAlert from "./MyAlert";
import ConfirmModal from "../../components/share/ConfirmModal";
import defaultProductImage from "./defaultProductImage.jpg"; // Import the default product image
import "./WarehouseItemList.css";

const WarehouseItemList = ({ zoneId, productSearchTerm }) => {
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [zone, setZone] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchWarehouseItems() {
      try {
        const response = await MyAxios.get(`/warehouse_items`, {
          params: { zone_id: zoneId },
        });
        if (Array.isArray(response.data.data)) {
          setWarehouseItems(response.data.data);
        } else {
          console.error("Data from API is not an array:", response.data);
          setWarehouseItems([]);
        }
      } catch (error) {
        console.error("Error fetching warehouse items:", error);
        setWarehouseItems([]);
      }
    }

    async function fetchItems() {
      try {
        const response = await MyAxios.get('/items');
        if (Array.isArray(response.data.data)) {
          setItems(response.data.data);
        } else {
          console.error("Data from API is not an array:", response.data);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
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
          console.error("Data from API is not an array:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }

    async function fetchZone() {
      try {
        const response = await MyAxios.get(`/zones/${zoneId}`);
        if (response.data && response.data.data) {
          setZone(response.data.data);
        } else {
          console.error("Zone data not found:", response.data);
        }
      } catch (error) {
        console.error("Error fetching zone:", error);
      }
    }

    async function fetchData() {
      setLoading(true);
      await fetchWarehouseItems();
      await fetchItems();
      await fetchProducts();
      await fetchZone();
      setLoading(false);
    }

    fetchData();
  }, [zoneId]);

  useEffect(() => {
    const expired = warehouseItems.filter((warehouseItem) => {
      const item = getItemById(warehouseItem.item_id);
      const expireDate = new Date(item.expire_date);
      return expireDate < new Date();
    });
    setExpiredProducts(expired);
    setShowAlert(expired.length > 0);
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

  const handleViewExpired = () => {
    setShowModal(true);
  };

  // const handleCreateExpiredForm = () => {
  //   // Navigate to the create expired form page (provide the URL)
  //   window.location.href = "/create-expired-form";
  // };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter warehouseItems based on productSearchTerm
  const filteredWarehouseItems = warehouseItems.filter((warehouseItem) => {
    const item = getItemById(warehouseItem.item_id);
    const product = getProductById(item.product_id);
    return product.name && product.name.toLowerCase().includes(productSearchTerm.toLowerCase());
  });

  const currentItems = filteredWarehouseItems.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(filteredWarehouseItems.length / itemsPerPage);

  const expiredProductStyle = { color: 'red' };

  return (
    <>
      {showAlert && (
        <MyAlert
          message={`There are expired items in warehouse ${zone.warehouse_id} and zone ${zone.name}.`}
          variant="danger"
          show={showAlert}
          setShow={setShowAlert}
        />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th style={{ textAlign: "center" }}>Image</th>
            <th style={{ textAlign: "center" }}>Quantity</th>
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
            const isExpired = new Date(item.expire_date) < new Date();
            const productImageUrl = productImages[product.id] || defaultProductImage; // Use default image if not available
            const cellStyle = isExpired ? expiredProductStyle : {};
            return (
              <tr key={warehouseItem.id}>
                <td style={cellStyle}>{product.name}</td>
                <td style={{ textAlign: "center", ...cellStyle }}>
                  <img
                    src={productImageUrl}
                    alt="Product"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ textAlign: "center", ...cellStyle }}>{warehouseItem.quantity}</td>
                <td style={cellStyle}>{item.expire_date}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination-wrapper text-center">
        <Pagination className="justify-content-center">
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
           {currentPage} / {totalPages}
        </div>
      </div>
      <Button variant="primary" onClick={handleViewExpired} style={{ marginTop: "20px", marginRight: "10px" }}>
        View Expired Products
      </Button>
      {/* <Button variant="danger" style={{ marginTop: "20px" }}>
        Create DisposalGoods
      </Button> */}

      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        // handleConfirm={handleCreateExpiredForm}
        // title="Expired Products"
        body={
          expiredProducts.length === 0 ? (
            "No products expired today."
          ) : (
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
                  if (!product.name) {
                    return null; // Skip if product details are not available
                  }
                  const productImageUrl = productImages[product.id] || defaultProductImage; // Use default image if not available
                  return (
                    <tr key={warehouseItem.id}>
                      <td>{product.name}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={productImageUrl}
                          alt="Product"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>{warehouseItem.quantity}</td>
                      <td>{item.expire_date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )
        }
      />
    </>
  );
};

export default WarehouseItemList;
