
// // import React, { useState, useEffect } from "react";
// // import { Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
// // import { useNavigate } from "react-router-dom";
// // import Select from "react-select";
// // import MyAxios from "../../util/MyAxios";

// // const CreateDisposalForm = (props) => {
// //   const [formData, setFormData] = useState({
// //     warehouse_id: "",
// //     details: {
// //       product_id: "",
// //       zone_id: "",
// //       expire_date: "",
// //       quantity: "",
// //       reason: ""
// //     }
// //   });

// //   const [warehouses, setWarehouses] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [zones, setZones] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchOptions = async () => {
// //       try {
// //         const [warehouseRes, productRes, zoneRes] = await Promise.all([
// //           MyAxios.get("warehouses"),  
// //           MyAxios.get("products"),
// //           MyAxios.get("zones"),
// //         ]);
// //         setWarehouses(warehouseRes.data);
// //         setProducts(productRes.data);
// //         setZones(zoneRes.data);
// //       } catch (error) {
// //         console.error("Error fetching options:", error);
// //         setError("Failed to load form options.");
// //       }
// //     };
// //     fetchOptions();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value
// //     }));
// //   };

// //   const handleProductSelect = (selectedOption) => {
// //     const selectedProduct = products.find(product => product.id === selectedOption.value);
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       details: {
// //         ...prevData.details,
// //         product_id: selectedProduct.id,
// //         zone_id: selectedProduct.default_zone_id,
// //         expire_date: selectedProduct.expire_date,
// //       }
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     setSuccess(false);
// //     try {
// //       await MyAxios.post("/api/goods_disposal/create", formData);
// //       setSuccess(true);
// //       navigate("/disposedgoods"); // Redirect to the disposal goods list page
// //     } catch (error) {
// //       console.error("Error creating disposal:", error);
// //       setError("Failed to create disposal.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h2>Create Disposal</h2>
// //       {error && <Alert variant="danger">{error}</Alert>}
// //       {success && <Alert variant="success">Disposal created successfully!</Alert>}
// //       <Form onSubmit={handleSubmit}>
// //         <Row className="mb-3">
// //           <Form.Group as={Col} controlId="warehouse_id">
// //             <Form.Label>Warehouse</Form.Label>
// //             <Form.Control
// //               as="select"
// //               name="warehouse_id"
// //               value={formData.warehouse_id}
// //               onChange={handleChange}
// //               required
// //             >
// //               <option value="">Select Warehouse</option>
// //               {warehouses.map((warehouse) => (
// //                 <option key={warehouse.id} value={warehouse.id}>
// //                   {warehouse.name}
// //                 </option>
// //               ))}
// //             </Form.Control>
// //           </Form.Group>
// //         </Row>

// //         <Row className="mb-3">
// //           <Form.Group as={Col} controlId="product_id">
// //             <Form.Label>Product</Form.Label>
// //             <Select
// //               className="mb-2"
// //               isSearchable
// //               value={products.find((product) => product.id === formData.details.product_id)}
// //               onChange={handleProductSelect}
// //               options={products.map((product) => ({
// //                 label: product.name,
// //                 value: product.id,
// //               }))}
// //             />
// //           </Form.Group>

// //           <Form.Group as={Col} controlId="zone_id">
// //           <Form.Label>Zone</Form.Label>
// //             <Select
// //               className="mb-2"
// //               isSearchable
// //               value={zones.find((Zone) => Zone.id === formData.details.zone_id)}
// //               onChange={handleProductSelect}
// //               options={products.map((product) => ({
// //                 label: product.name,
// //                 value: product.id,
// //               }))}
// //             />
// //             <Form.Label></Form.Label>
// //             <Form.Control
// //               as="select"
// //               name="zone_id"
// //               value={formData.details.zone_id}
// //               onChange={handleChange}
// //               required
// //             >
// //               <option value="">Select Zone</option>
// //               {zones.map((zone) => (
// //                 <option key={zone.id} value={zone.id}>
// //                   {zone.name}
// //                 </option>
// //               ))}
// //             </Form.Control>
// //           </Form.Group>
// //         </Row>

// //         <Row className="mb-3">
// //           <Form.Group as={Col} controlId="expire_date">
// //             <Form.Label>Expire Date</Form.Label>
// //             <Form.Control
// //               type="date"
// //               name="expire_date"
// //               value={formData.details.expire_date}
// //               onChange={handleChange}
// //               required
// //             />
// //           </Form.Group>

// //           <Form.Group as={Col} controlId="quantity">
// //             <Form.Label>Quantity</Form.Label>
// //             <Form.Control
// //               type="number"
// //               placeholder="Enter quantity"
// //               name="quantity"
// //               value={formData.details.quantity}
// //               onChange={handleChange}
// //               required
// //             />
// //           </Form.Group>
// //         </Row>

// //         <Row className="mb-3">
// //           <Form.Group as={Col} controlId="reason">
// //             <Form.Label>Reason</Form.Label>
// //             <Form.Control
// //               type="text"
// //               placeholder="Enter reason for disposal"
// //               name="reason"
// //               value={formData.details.reason}
// //               onChange={handleChange}
// //               required
// //             />
// //           </Form.Group>
// //         </Row>

// //         <Button variant="primary" type="submit" disabled={loading}>
// //           {loading ? "Submitting..." : "Submit"}
// //         </Button>
// //       </Form>
// //     </div>
// //   );
// // };

// // export default CreateDisposalForm;
// // import React, { useState, useEffect } from "react";
// // import MyAxios from "../../util/MyAxios";
// // import { Form, Button, Container, Row, Col } from "react-bootstrap";

// // const CreateDisposal = () => {
// //   const [warehouses, setWarehouses] = useState([]);
// //   const [zones, setZones] = useState([]);
// //   const [expiredProducts, setExpiredProducts] = useState([]);
// //   const [selectedWarehouse, setSelectedWarehouse] = useState("");
// //   const [selectedZone, setSelectedZone] = useState("");
// //   const [selectedProduct, setSelectedProduct] = useState("");
// //   const [quantity, setQuantity] = useState("");
// //   const [reason, setReason] = useState("");

// //   useEffect(() => {
// //     async function fetchWarehouses() {
// //       try {
// //         const response = await MyAxios.get("/warehouses");
// //         setWarehouses(response.data.data);
// //       } catch (error) {
// //         console.error("Error fetching warehouses:", error);
// //       }
// //     }

// //     fetchWarehouses();
// //   }, []);

// //   useEffect(() => {
// //     if (selectedWarehouse) {
// //       async function fetchZones() {
// //         try {
// //           const response = await MyAxios.get("/zones", {
// //             params: { warehouse_id: selectedWarehouse },
// //           });
// //           setZones(response.data.data);
// //         } catch (error) {
// //           console.error("Error fetching zones:", error);
// //         }
// //       }

// //       fetchZones();
// //     } else {
// //       setZones([]);
// //       setSelectedZone("");
// //       setExpiredProducts([]);
// //       setSelectedProduct("");
// //     }
// //   }, [selectedWarehouse]);

// //   useEffect(() => {
// //     if (selectedZone) {
// //       async function fetchExpiredProducts() {
// //         try {
// //           const response = await MyAxios.get("/warehouse_items", {
// //             params: { warehouse_id: selectedWarehouse, zone_id: selectedZone },
// //           });
// //           const expired = response.data.data.filter((item) => {
// //             const expireDate = new Date(item.expire_date);
// //             return expireDate < new Date();
// //           });
// //           setExpiredProducts(expired);
// //         } catch (error) {
// //           console.error("Error fetching expired products:", error);
// //         }
// //       }

// //       fetchExpiredProducts();
// //     } else {
// //       setExpiredProducts([]);
// //       setSelectedProduct("");
// //     }
// //   }, [selectedZone, selectedWarehouse]);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       await MyAxios.post("http://localhost:2000/api/goods_disposal/create", {
// //         warehouse_id: selectedWarehouse,
// //         zone_id: selectedZone,
// //         product_id: selectedProduct,
// //         quantity: parseInt(quantity), // Ensure quantity is parsed to integer
// //         reason,
// //       });
// //       alert("Disposal created successfully!");
// //       // Reset form after successful submission
// //       setSelectedWarehouse("");
// //       setSelectedZone("");
// //       setSelectedProduct("");
// //       setQuantity("");
// //       setReason("");
// //     } catch (error) {
// //       console.error("Error creating disposal:", error);
// //       alert("Failed to create disposal.");
// //     }
// //   };

// //   return (
// //     <Container>
// //       <h2>Create Disposal</h2>
// //       <Form onSubmit={handleSubmit}>
// //         <Form.Group as={Row} controlId="formWarehouse">
// //           <Form.Label column sm={2}>
// //             Warehouse
// //           </Form.Label>
// //           <Col sm={10}>
// //             <Form.Control
// //               as="select"
// //               value={selectedWarehouse}
// //               onChange={(e) => setSelectedWarehouse(e.target.value)}
// //               required
// //             >
// //               <option value="">Select Warehouse</option>
// //               {warehouses.map((warehouse) => (
// //                 <option key={warehouse.id} value={warehouse.id}>
// //                   {warehouse.name}
// //                 </option>
// //               ))}
// //             </Form.Control>
// //           </Col>
// //         </Form.Group>

// //         <Form.Group as={Row} controlId="formZone">
// //           <Form.Label column sm={2}>
// //             Zone
// //           </Form.Label>
// //           <Col sm={10}>
// //             <Form.Control
// //               as="select"
// //               value={selectedZone}
// //               onChange={(e) => setSelectedZone(e.target.value)}
// //               required
// //               disabled={!selectedWarehouse}
// //             >
// //               <option value="">Select Zone</option>
// //               {zones.map((zone) => (
// //                 <option key={zone.id} value={zone.id}>
// //                   {zone.name}
// //                 </option>
// //               ))}
// //             </Form.Control>
// //           </Col>
// //         </Form.Group>

// //         <Form.Group as={Row} controlId="formProduct">
// //           <Form.Label column sm={2}>
// //             Expired Product
// //           </Form.Label>
// //           <Col sm={10}>
// //             <Form.Control
// //               as="select"
// //               value={selectedProduct}
// //               onChange={(e) => setSelectedProduct(e.target.value)}
// //               required
// //               disabled={!selectedZone}
// //             >
// //               <option value="">Select Expired Product</option>
// //               {expiredProducts.map((item) => (
// //                 <option key={item.id} value={item.item_id}>
// //                   {item.product_name} - {item.quantity} {item.unit}
// //                 </option>
// //               ))}
// //             </Form.Control>
// //           </Col>
// //         </Form.Group>

// //         <Form.Group as={Row} controlId="formQuantity">
// //           <Form.Label column sm={2}>
// //             Quantity
// //           </Form.Label>
// //           <Col sm={10}>
// //             <Form.Control
// //               type="number"
// //               value={quantity}
// //               onChange={(e) => setQuantity(e.target.value)}
// //               required
// //               min="1"
// //             />
// //           </Col>
// //         </Form.Group>

// //         <Form.Group as={Row} controlId="formReason">
// //           <Form.Label column sm={2}>
// //             Reason
// //           </Form.Label>
// //           <Col sm={10}>
// //             <Form.Control
// //               as="textarea"
// //               rows={3}
// //               value={reason}
// //               onChange={(e) => setReason(e.target.value)}
// //               required
// //             />
// //           </Col>
// //         </Form.Group>

// //         <Button variant="primary" type="submit" className="mt-3">
// //           Create Disposal
// //         </Button>
// //       </Form>
// //     </Container>
// //   );
// // };

// // export default CreateDisposal;
// import React, { useState, useEffect } from "react";
// import { Form, Button, Container, Row, Col, Table, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import MyAxios from "../../util/MyAxios";
// import defaultProductImage from "./defaultProductImage.jpg";

// const CreateDisposal = () => {
//   const [warehouses, setWarehouses] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [items, setItems] = useState([]);
//   const [productImages, setProductImages] = useState({});
  
//   const [selectedWarehouse, setSelectedWarehouse] = useState("");
//   const [selectedZone, setSelectedZone] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [expiredProducts, setExpiredProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchWarehouses = async () => {
//       try {
//         const response = await MyAxios.get("/warehouses");
//         setWarehouses(response.data.data);
//       } catch (error) {
//         console.error("Error fetching warehouses:", error);
//       }
//     };
//     fetchWarehouses();
//   }, []);

//   useEffect(() => {
//     if (selectedWarehouse) {
//       const fetchZones = async () => {
//         try {
//           const response = await MyAxios.get("/zones", {
//             params: { warehouse_id: selectedWarehouse },
//           });
//           setZones(response.data.data);
//           setSelectedZone("");
//           setSelectedProduct("");
//           setExpiredProducts([]);
//         } catch (error) {
//           console.error("Error fetching zones:", error);
//         }
//       };
//       fetchZones();
//     }
//   }, [selectedWarehouse]);

//   useEffect(() => {
//     if (selectedZone) {
//       const fetchProducts = async () => {
//         try {
//           const response = await MyAxios.get("/products", {
//             params: { zone_id: selectedZone },
//           });
//           setProducts(response.data.data);
//           setSelectedProduct("");
//           setExpiredProducts([]);
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         }
//       };
//       fetchProducts();
//     }
//   }, [selectedZone]);

//   useEffect(() => {
//     if (selectedProduct) {
//       const fetchExpiredProducts = async () => {
//         try {
//           const response = await MyAxios.get("/warehouse_items", {
//             params: { zone_id: selectedZone, product_id: selectedProduct },
//           });
//           const warehouseItems = response.data.data;

//           const fetchItems = await MyAxios.get("/items");
//           const items = fetchItems.data.data;

//           const expired = warehouseItems.filter((warehouseItem) => {
//             const item = items.find((item) => item.id === warehouseItem.item_id);
//             if (item) {
//               const expireDate = new Date(item.expire_date);
//               return expireDate < new Date();
//             }
//             return false;
//           }).map((warehouseItem) => {
//             const item = items.find((item) => item.id === warehouseItem.item_id);
//             return {
//               ...warehouseItem,
//               expire_date: item.expire_date,
//             };
//           });

//           setExpiredProducts(expired);
//           setItems(items);

//           // Fetch images for each product
//           products.forEach(async (product) => {
//             try {
//               const imageResponse = await MyAxios.get(
//                 `/products/${product.id}/image`,
//                 {
//                   responseType: "arraybuffer",
//                 }
//               );
//               const base64Image = btoa(
//                 new Uint8Array(imageResponse.data).reduce(
//                   (data, byte) => data + String.fromCharCode(byte),
//                   ""
//                 )
//               );
//               setProductImages((prevImages) => ({
//                 ...prevImages,
//                 [product.id]: `data:image/jpeg;base64,${base64Image}`,
//               }));
//             } catch (error) {
//               console.error(`Error fetching image for product ${product.id}:`, error);
//             }
//           });
//         } catch (error) {
//           console.error("Error fetching expired products:", error);
//         }
//       };
//       fetchExpiredProducts();
//     }
//   }, [selectedProduct]);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleConfirmDisposal = async () => {
//     setShowModal(false);
//     try {
//       const response = await MyAxios.post("/goods_disposal/create", {
//         warehouse_id: selectedWarehouse,
//         zone_id: selectedZone,
//         product_id: selectedProduct,
//         quantity: expiredProducts.reduce((total, product) => total + product.quantity, 0),
//       });
//       setMessage("Disposal created successfully!");
//       setTimeout(() => navigate("/"), 2000); // Redirect to home page after 2 seconds
//     } catch (error) {
//       setMessage("Failed to create disposal. Please try again.");
//       console.error("Error creating disposal:", error);
//     }
//   };

//   const handleDisposeButtonClick = (product) => {
//     setSelectedProduct(product.id);
//     setShowModal(true);
//   };

//   const getProductById = (productId) => {
//     return products.find((product) => product.id === productId) || {};
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <Col md="8">
//           <h2>Create Disposal</h2>
//           <Form>
//             <Form.Group controlId="formWarehouse">
//               <Form.Label>Warehouse</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedWarehouse}
//                 onChange={(e) => setSelectedWarehouse(e.target.value)}
//                 required
//               >
//                 <option value="">Select Warehouse</option>
//                 {warehouses.map((warehouse) => (
//                   <option key={warehouse.id} value={warehouse.id}>
//                     {warehouse.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="formZone" className="mt-3">
//               <Form.Label>Zone</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedZone}
//                 onChange={(e) => setSelectedZone(e.target.value)}
//                 required
//               >
//                 <option value="">Select Zone</option>
//                 {zones.map((zone) => (
//                   <option key={zone.id} value={zone.id}>
//                     {zone.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="formProduct" className="mt-3">
//               <Form.Label>Product</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedProduct}
//                 onChange={(e) => setSelectedProduct(e.target.value)}
//                 required
//               >
//                 <option value="">Select Product</option>
//                 {products.map((product) => (
//                   <option key={product.id} value={product.id}>
//                     {product.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>

//             <Table striped bordered hover className="mt-4">
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th style={{ textAlign: "center" }}>Image</th>
//                   <th style={{ textAlign: "center" }}>Quantity</th>
//                   <th>Expire Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {expiredProducts.map((warehouseItem) => {
//                   const item = items.find((item) => item.id === warehouseItem.item_id);
//                   const product = getProductById(item.product_id);
//                   const productImageUrl =
//                     productImages[product.id] || defaultProductImage;
//                   return (
//                     <tr key={warehouseItem.id}>
//                       <td>{product.name}</td>
//                       <td style={{ textAlign: "center" }}>
//                         <img
//                           src={productImageUrl}
//                           alt="Product"
//                           style={{ width: "50px", height: "50px" }}
//                         />
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         {warehouseItem.quantity}
//                       </td>
//                       <td>{item ? item.expire_date : "N/A"}</td>
//                       <td>
//                         <Button
//                           variant="danger"
//                           onClick={() => handleDisposeButtonClick(product)}
//                         >
//                           Disposal
//                         </Button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </Table>
//           </Form>

//           <Modal show={showModal} onHide={handleCloseModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>Confirm Disposal</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               Are you sure you want to dispose {getProductById(selectedProduct)?.name || ''}?
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>
//                 Cancel
//               </Button>
//               <Button variant="danger" onClick={handleConfirmDisposal}>
//                 Confirm
//               </Button>
//             </Modal.Footer>
//           </Modal>
          
//           {message && <p className="mt-3">{message}</p>}
//         </Col>
//       </Row>
//       </Container>
//   );
// };

// export default CreateDisposal;
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyAxios from "../../util/MyAxios";

const CreateDisposal = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedExpiredDate, setSelectedExpiredDate] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWarehouses() {
      try {
        const response = await MyAxios.get("/warehouses");
        setWarehouses(response.data.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    }

    fetchWarehouses();
  }, []);

  useEffect(() => {
    async function fetchZones() {
      if (selectedWarehouse) {
        try {
          const response = await MyAxios.get("/zones", {
            params: { warehouse_id: selectedWarehouse },
          });
          setZones(response.data.data);
        } catch (error) {
          console.error("Error fetching zones:", error);
        }
      }
    }

    fetchZones();
  }, [selectedWarehouse]);

  useEffect(() => {
    async function fetchProducts() {
      if (selectedZone) {
        try {
          const response = await MyAxios.get("/products", {
            params: { zone_id: selectedZone },
          });
          setProducts(response.data.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    }

    fetchProducts();
  }, [selectedZone]);

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
    setSelectedZone("");
    setSelectedProduct("");
  };

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
    setSelectedProduct("");
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleConfirmDisposal = async () => {
    try {
      const response = await MyAxios.post("/goods_disposal/create", {
        product_id: selectedProduct,
        expired_date: selectedExpiredDate,
        quantity: selectedQuantity,
        reason: selectedReason,
      });
      if (response.status === 200) {
        setMessage("Disposal created successfully!");
        setShowModal(true);
      } else {
        console.error("Failed to create disposal:", response.data.message);
        setMessage("Failed to create disposal.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error creating disposal:", error);
      setMessage("Failed to create disposal.");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (message === "Disposal created successfully!") {
      navigate("/");
    }
  };

  return (
    <Container>
      <h2>Create Disposal</h2>
      <Form>
        <Form.Group controlId="warehouseSelect">
          <Form.Label>Warehouse</Form.Label>
          <Form.Control
            as="select"
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
          >
            <option value="">Select warehouse...</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="zoneSelect">
          <Form.Label>Zone</Form.Label>
          <Form.Control
            as="select"
            value={selectedZone}
            onChange={handleZoneChange}
            disabled={!selectedWarehouse}
          >
            <option value="">Select zone...</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productSelect">
          <Form.Label>Product</Form.Label>
          <Form.Control
            as="select"
            value={selectedProduct}
            onChange={handleProductChange}
            disabled={!selectedZone}
          >
            <option value="">Select product...</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {selectedProduct && (
          <Form.Group controlId="expiredDateInput">
            <Form.Label>Expired Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedExpiredDate}
              onChange={(e) => setSelectedExpiredDate(e.target.value)}
            />
          </Form.Group>
        )}

        {selectedProduct && (
          <Form.Group controlId="quantityInput">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(e.target.value)}
            />
          </Form.Group>
        )}

        {selectedProduct && (
          <Form.Group controlId="reasonInput">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            />
          </Form.Group>
        )}

        <Button
          variant="primary"
          type="button"
          onClick={handleConfirmDisposal}
          disabled={!selectedProduct || !selectedExpiredDate || !selectedQuantity || !selectedReason}
        >
          Create Disposal
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateDisposal;
