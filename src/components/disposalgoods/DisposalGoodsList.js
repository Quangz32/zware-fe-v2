import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MyAxios from "../../util/MyAxios";
import ConfirmModal from "../../components/share/ConfirmModal";
import defaultProductImage from "./defaultProductImage.jpg";

const DisposalGoods = ({ warehouseId }) => {
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [zones, setZones] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWarehouseItems() {
      try {
        const response = await MyAxios.get(`/warehouse_items`, {
          params: { warehouse_id: warehouseId },
        });
        setWarehouseItems(response.data.data);
      } catch (error) {
        console.error("Error fetching warehouse items:", error);
      }
    }

    async function fetchItems() {
      try {
        const response = await MyAxios.get('/items');
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    async function fetchProducts() {
      try {
        const response = await MyAxios.get('/products');
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    async function fetchZones() {
      try {
        const response = await MyAxios.get('/zones');
        setZones(response.data.data);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    }

    async function fetchData() {
      await fetchWarehouseItems();
      await fetchItems();
      await fetchProducts();
      await fetchZones();
    }

    fetchData();
  }, [warehouseId]);

  useEffect(() => {
    const expired = warehouseItems.filter((warehouseItem) => {
      const item = items.find(item => item.id === warehouseItem.item_id);
      if (item) {
        const expireDate = new Date(item.expire_date);
        return expireDate < new Date();
      }
      return false;
    });
    setExpiredProducts(expired);
  }, [warehouseItems, items]);

  const getProductById = (productId) => {
    return products.find(product => product.id === productId) || {};
  };

  const getZoneById = (zoneId) => {
    return zones.find(zone => zone.id === zoneId) || {};
  };

  const handleViewExpired = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Disposal Goods</h1>
      <Button onClick={handleViewExpired}>View Expired Products</Button>
      <Link to="/create-disposal">
        <Button variant="primary" className="ms-2">
          Create Disposal
        </Button>
      </Link>
      <ConfirmModal
        show={showModal}
        handleClose={handleCloseModal}
        title="Expired Products"
        body={
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th>Expire Date</th>
                <th>Zone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expiredProducts.map((warehouseItem) => {
                const item = items.find(item => item.id === warehouseItem.item_id);
                const product = getProductById(item.product_id);
                const zone = getZoneById(warehouseItem.zone_id);
                const productImageUrl = productImages[product.id] || defaultProductImage;
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
                    <td>{item ? item.expire_date : "N/A"}</td>
                    <td>{zone.name}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => navigate('/create-disposal', {
                          state: {
                            product_name: product.name,
                            zone_name: zone.name,
                            expire_date: item ? item.expire_date : '',
                            quantity: warehouseItem.quantity,
                          },
                        })}
                      >
                        Create Disposal
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        }
      />
    </div>
  );
};

export default DisposalGoods;
