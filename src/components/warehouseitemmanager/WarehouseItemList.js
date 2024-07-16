import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Modal, Form, Alert } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import MyAlert from "./MyAlert";
import ConfirmModal from "../../components/share/ConfirmModal";
import defaultProductImage from "./defaultProductImage.jpg"; // Import the default product image
// import "./WarehouseItemList.css"; // Assuming you have some custom styles

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
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [moveQuantity, setMoveQuantity] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
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

    async function fetchZones() {
      try {
        const response = await MyAxios.get('/zones');
        if (Array.isArray(response.data.data)) {
          setZones(response.data.data);
        } else {
          console.error("Data from API is not an array:", response.data);
          setZones([]);
        }
      } catch (error) {
        console.error("Error fetching zones:", error);
        setZones([]);
      }
    }

    async function fetchData() {
      setLoading(true);
      await fetchWarehouseItems();
      await fetchItems();
      await fetchProducts();
      await fetchZone();
      await fetchZones();
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMoveClick = (item) => {
    setSelectedItem(item);
    setMoveQuantity("");
    setErrorMessages([]);
    setShowMoveModal(true);
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  const handleMoveQuantityChange = (event) => {
    setMoveQuantity(event.target.value);
  };

  const handleMoveSubmit = async () => {
    if (!selectedZone || !selectedItem || !moveQuantity) {
      setErrorMessages(["All fields are required."]);
      return;
    }
    if (moveQuantity <= 0) {
      setErrorMessages(["Quantity must be greater than 0."]);
      return;
    }

    const moveData = {
      warehouse_id: zone.warehouse_id,
      source_zone: zone.id,
      destination_zone: selectedZone,
      details: [
        {
          item_id: selectedItem.item_id,
          quantity: moveQuantity,
        },
      ],
    };

    try {
      await MyAxios.post('/warehouse_items/inwarehouse_transaction', moveData);
      setShowMoveModal(false);
      setSelectedItem(null);
      setSelectedZone("");
      setMoveQuantity("");
      setErrorMessages([]);
    } catch (error) {
      console.error("Error moving item:");
      setErrorMessages(["Error moving item"]);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

  const warehouseZones = zones.filter((zoneItem) => zoneItem.warehouse_id === zone.warehouse_id);

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
            <th style={{ textAlign: "center" }}>Move</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((warehouseItem) => {
            const item = getItemById(warehouseItem.item_id);
            const product = getProductById(item.product_id);
            if (!product.name) {
              return null;
            }
            const isExpired = new Date(item.expire_date) < new Date();
            const productImageUrl = productImages[product.id] || defaultProductImage;
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
                <td style={{ textAlign: "center", ...cellStyle }}>
                  <Button variant="primary" onClick={() => handleMoveClick(warehouseItem)}>
                    Move
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <Button variant="danger" onClick={handleViewExpired}>
        View Expired Items
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Expired Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Expire Date</th>
              </tr>
            </thead>
            <tbody>
              {expiredProducts.map((warehouseItem) => {
                const item = getItemById(warehouseItem.item_id);
                const product = getProductById(item.product_id);
                if (!product.name) {
                  return null;
                }
                return (
                  <tr key={warehouseItem.id}>
                    <td>{product.name}</td>
                    <td>{warehouseItem.quantity}</td>
                    <td>{item.expire_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMoveModal} onHide={() => setShowMoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Move Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessages.length > 0 && (
            <div variant="danger" className="text-center">
              {errorMessages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          )}
          <Form>
            <Form.Group controlId="formZone">
              <Form.Label>Select Destination Zone</Form.Label>
              <Form.Control as="select" value={selectedZone} onChange={handleZoneChange}>
                <option value="">Select Zone</option>
                {warehouseZones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={moveQuantity}
                onChange={handleMoveQuantityChange}
                placeholder="Enter quantity to move"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMoveModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleMoveSubmit}>
            Move
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WarehouseItemList;
