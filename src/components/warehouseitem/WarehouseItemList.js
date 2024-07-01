import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";

const WarehouseItemList = ({ zoneId }) => {
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productImage, setProductImage] = useState(null); // State để lưu trữ hình ảnh

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
          setProducts(response.data.data);
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

  const getItemById = (itemId) => {
    return items.find(item => item.id === itemId) || {};
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId) || {};
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
        {warehouseItems.map((warehouseItem) => {
          const item = getItemById(warehouseItem.item_id);
          const product = getProductById(item.product_id);
          if (!product.name || !product.image) {
            return null; // Skip if product details are not available
          }
          return (
            <tr key={warehouseItem.id}>
              <td>{product.name}</td>
              <td>
                <img
                  src={product.image}
                  alt="Product"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{warehouseItem.quantity}</td>
              <td>{item.expire_date}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default WarehouseItemList;
