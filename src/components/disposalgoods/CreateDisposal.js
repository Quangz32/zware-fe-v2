// // import React, { useState, useEffect } from "react";
// // import { Container, Form, Button, Modal } from "react-bootstrap";
// // import { useNavigate } from "react-router-dom";
// // import MyAxios from "../../util/MyAxios";

// // const CreateDisposal = () => {
// //   const [warehouses, setWarehouses] = useState([]);
// //   const [zones, setZones] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [selectedWarehouse, setSelectedWarehouse] = useState("");
// //   const [selectedZone, setSelectedZone] = useState("");
// //   const [selectedProduct, setSelectedProduct] = useState("");
// //   const [selectedExpiredDate, setSelectedExpiredDate] = useState("");
// //   const [selectedQuantity, setSelectedQuantity] = useState("");
// //   const [selectedReason, setSelectedReason] = useState("");
// //   const [showModal, setShowModal] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();

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
// //     async function fetchZones() {
// //       if (selectedWarehouse) {
// //         try {
// //           const response = await MyAxios.get("/zones", {
// //             params: { warehouse_id: selectedWarehouse },
// //           });
// //           setZones(response.data.data);
// //         } catch (error) {
// //           console.error("Error fetching zones:", error);
// //         }
// //       }
// //     }

// //     fetchZones();
// //   }, [selectedWarehouse]);

// //   useEffect(() => {
// //     async function fetchProducts() {
// //       if (selectedZone) {
// //         try {
// //           const response = await MyAxios.get("/products", {
// //             params: { zone_id: selectedZone },
// //           });
// //           setProducts(response.data.data);
// //         } catch (error) {
// //           console.error("Error fetching products:", error);
// //         }
// //       }
// //     }

// //     fetchProducts();
// //   }, [selectedZone]);

// //   const handleWarehouseChange = (e) => {
// //     setSelectedWarehouse(e.target.value);
// //     setSelectedZone("");
// //     setSelectedProduct("");
// //   };

// //   const handleZoneChange = (e) => {
// //     setSelectedZone(e.target.value);
// //     setSelectedProduct("");
// //   };

// //   const handleProductChange = (e) => {
// //     setSelectedProduct(e.target.value);
// //   };

// //   const handleConfirmDisposal = async () => {
// //     try {
// //       const response = await MyAxios.post("/goods_disposal/create", {
// //         product_id: selectedProduct,
// //         expired_date: selectedExpiredDate,
// //         quantity: selectedQuantity,
// //         reason: selectedReason,
// //       });
// //       if (response.status === 200) {
// //         setMessage("Disposal created successfully!");
// //         setShowModal(true);
// //       } else {
// //         console.error("Failed to create disposal:", response.data.message);
// //         setMessage("Failed to create disposal.");
// //         setShowModal(true);
// //       }
// //     } catch (error) {
// //       console.error("Error creating disposal:", error);
// //       setMessage("Failed to create disposal.");
// //       setShowModal(true);
// //     }
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //     if (message === "Disposal created successfully!") {
// //       navigate("/");
// //     }
// //   };

// //   return (
// //     <Container>
// //       <h2>Create Disposal</h2>
// //       <Form>
// //         <Form.Group controlId="warehouseSelect">
// //           <Form.Label>Warehouse</Form.Label>
// //           <Form.Control
// //             as="select"
// //             value={selectedWarehouse}
// //             onChange={handleWarehouseChange}
// //           >
// //             <option value="">Select warehouse...</option>
// //             {warehouses.map((warehouse) => (
// //               <option key={warehouse.id} value={warehouse.id}>
// //                 {warehouse.name}
// //               </option>
// //             ))}
// //           </Form.Control>
// //         </Form.Group>

// //         <Form.Group controlId="zoneSelect">
// //           <Form.Label>Zone</Form.Label>
// //           <Form.Control
// //             as="select"
// //             value={selectedZone}
// //             onChange={handleZoneChange}
// //             disabled={!selectedWarehouse}
// //           >
// //             <option value="">Select zone...</option>
// //             {zones.map((zone) => (
// //               <option key={zone.id} value={zone.id}>
// //                 {zone.name}
// //               </option>
// //             ))}
// //           </Form.Control>
// //         </Form.Group>

// //         <Form.Group controlId="productSelect">
// //           <Form.Label>Product</Form.Label>
// //           <Form.Control
// //             as="select"
// //             value={selectedProduct}
// //             onChange={handleProductChange}
// //             disabled={!selectedZone}
// //           >
// //             <option value="">Select product...</option>
// //             {products.map((product) => (
// //               <option key={product.id} value={product.id}>
// //                 {product.name}
// //               </option>
// //             ))}
// //           </Form.Control>
// //         </Form.Group>

// //         {selectedProduct && (
// //           <Form.Group controlId="expiredDateInput">
// //             <Form.Label>Expired Date</Form.Label>
// //             <Form.Control
// //               type="date"
// //               value={selectedExpiredDate}
// //               onChange={(e) => setSelectedExpiredDate(e.target.value)}
// //             />
// //           </Form.Group>
// //         )}

// //         {selectedProduct && (
// //           <Form.Group controlId="quantityInput">
// //             <Form.Label>Quantity</Form.Label>
// //             <Form.Control
// //               type="number"
// //               value={selectedQuantity}
// //               onChange={(e) => setSelectedQuantity(e.target.value)}
// //             />
// //           </Form.Group>
// //         )}

// //         {selectedProduct && (
// //           <Form.Group controlId="reasonInput">
// //             <Form.Label>Reason</Form.Label>
// //             <Form.Control
// //               as="textarea"
// //               rows={3}
// //               value={selectedReason}
// //               onChange={(e) => setSelectedReason(e.target.value)}
// //             />
// //           </Form.Group>
// //         )}

// //         <Button
// //           variant="primary"
// //           type="button"
// //           onClick={handleConfirmDisposal}
// //           disabled={!selectedProduct || !selectedExpiredDate || !selectedQuantity || !selectedReason}
// //         >
// //           Create Disposal
// //         </Button>
// //       </Form>

// //       <Modal show={showModal} onHide={handleCloseModal}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Message</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>{message}</Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleCloseModal}>
// //             Close
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </Container>
// //   );
// // };

// // export default CreateDisposal;
// // // import React, { useState, useEffect } from "react";
// // // import { Form, Button, Container, Row, Col } from "react-bootstrap";
// // // import MyAxios from "../../util/MyAxios";

// // // const CreateDisposalForm = ({ warehouses, onWarehouseChange }) => {
// // //   const [formData, setFormData] = useState({
// // //     warehouseId: "",
// // //     zoneId: "",
// // //     productId: "",
// // //     quantity: 0,
// // //     reason: "",
// // //   });
// // //   const [zones, setZones] = useState([]);
// // //   const [products, setProducts] = useState([]);

// // //   useEffect(() => {
// // //     // Reset zoneId when warehouseId changes
// // //     setFormData((prevData) => ({
// // //       ...prevData,
// // //       zoneId: "",
// // //     }));

// // //     // Fetch zones for selected warehouse
// // //     async function fetchZones() {
// // //       if (formData.warehouseId) {
// // //         try {
// // //           const response = await MyAxios.get(`/zones`, {
// // //             params: { warehouse_id: formData.warehouseId },
// // //           });
// // //           setZones(response.data.data);
// // //         } catch (error) {
// // //           console.error("Error fetching zones:", error);
// // //         }
// // //       }
// // //     }
// // //     fetchZones();
// // //   }, [formData.warehouseId]);

// // //   useEffect(() => {
// // //     async function fetchProducts() {
// // //       try {
// // //         const response = await MyAxios.get("/products");
// // //         setProducts(response.data.data);
// // //       } catch (error) {
// // //         console.error("Error fetching products:", error);
// // //       }
// // //     }
// // //     fetchProducts();
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prevData) => ({
// // //       ...prevData,
// // //       [name]: value,
// // //     }));

// // //     if (name === "warehouseId") {
// // //       onWarehouseChange(value); // Pass selected warehouseId to parent component
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const response = await MyAxios.post("/goods_disposal/create", formData);
// // //       console.log("Disposal created successfully:", response.data);
// // //       // Handle success scenario (e.g., show success message, redirect, etc.)
// // //     } catch (error) {
// // //       console.error("Error creating disposal:", error);
// // //       // Handle error scenario (e.g., show error message)
// // //     }
// // //   };

// // //   return (
// // //     <Container>
// // //       <Row className="justify-content-md-center">
// // //         <Col md={6}>
// // //           <Form onSubmit={handleSubmit}>
// // //             <Form.Group className="mb-3" controlId="warehouseId">
// // //               <Form.Label>Select Warehouse</Form.Label>
// // //               <Form.Control
// // //                 as="select"
// // //                 name="warehouseId"
// // //                 value={formData.warehouseId}
// // //                 onChange={handleChange}
// // //                 required
// // //               >
// // //                 <option value="">Select a warehouse</option>
// // //                 {warehouses.map((warehouse) => (
// // //                   <option key={warehouse.id} value={warehouse.id}>
// // //                     {warehouse.name}
// // //                   </option>
// // //                 ))}
// // //               </Form.Control>
// // //             </Form.Group>

// // //             <Form.Group className="mb-3" controlId="zoneId">
// // //               <Form.Label>Select Zone</Form.Label>
// // //               <Form.Control
// // //                 as="select"
// // //                 name="zoneId"
// // //                 value={formData.zoneId}
// // //                 onChange={handleChange}
// // //                 disabled={!formData.warehouseId}
// // //                 required
// // //               >
// // //                 <option value="">Select a zone</option>
// // //                 {zones.map((zone) => (
// // //                   <option key={zone.id} value={zone.id}>
// // //                     {zone.name}
// // //                   </option>
// // //                 ))}
// // //               </Form.Control>
// // //             </Form.Group>

// // //             <Form.Group className="mb-3" controlId="productId">
// // //               <Form.Label>Select Product</Form.Label>
// // //               <Form.Control
// // //                 as="select"
// // //                 name="productId"
// // //                 value={formData.productId}
// // //                 onChange={handleChange}
// // //                 required
// // //               >
// // //                 <option value="">Select a product</option>
// // //                 {products.map((product) => (
// // //                   <option key={product.id} value={product.id}>
// // //                     {product.name}
// // //                   </option>
// // //                 ))}
// // //               </Form.Control>
// // //             </Form.Group>

// // //             <Form.Group className="mb-3" controlId="quantity">
// // //               <Form.Label>Quantity</Form.Label>
// // //               <Form.Control
// // //                 type="number"
// // //                 name="quantity"
// // //                 value={formData.quantity}
// // //                 onChange={handleChange}
// // //                 required
// // //               />
// // //             </Form.Group>

// // //             <Form.Group className="mb-3" controlId="reason">
// // //               <Form.Label>Reason</Form.Label>
// // //               <Form.Control
// // //                 as="textarea"
// // //                 rows={3}
// // //                 name="reason"
// // //                 value={formData.reason}
// // //                 onChange={handleChange}
// // //                 required
// // //               />
// // //             </Form.Group>

// // //             <Button variant="primary" type="submit">
// // //               Submit
// // //             </Button>
// // //           </Form>
// // //         </Col>
// // //       </Row>
// // //     </Container>
// // //   );
// // // };

// // // export default CreateDisposalForm;

// // // import React, { useState, useEffect } from "react";
// // // import { Form, Button, ListGroup } from "react-bootstrap";
// // // import MyAxios from "../../util/MyAxios";
// // // import ConfirmModal from "../../components/share/ConfirmModal";

// // // const DisposalPage = () => {
// // //   const [warehouses, setWarehouses] = useState([]);
// // //   const [zones, setZones] = useState([]);
// // //   const [productsByWarehouse, setProductsByWarehouse] = useState({});
// // //   const [selectedWarehouse, setSelectedWarehouse] = useState(null);
// // //   const [selectedZone, setSelectedZone] = useState(null);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);
// // //   const [reason, setReason] = useState("");
// // //   const [showModal, setShowModal] = useState(false);

// // //   // Fetch warehouses from API
// // //   useEffect(() => {
// // //     async function fetchWarehouses() {
// // //       try {
// // //         const response = await MyAxios.get("/warehouses");
// // //         setWarehouses(response.data.data);
// // //       } catch (error) {
// // //         console.error("Error fetching warehouses:", error);
// // //       }
// // //     }
// // //     fetchWarehouses();
// // //   }, []);

// // //   // Fetch zones based on selected warehouse
// // //   useEffect(() => {
// // //     async function fetchZones() {
// // //       if (selectedWarehouse) {
// // //         try {
// // //           const response = await MyAxios.get("/zones", {
// // //             params: { warehouse_id: selectedWarehouse.id },
// // //           });
// // //           setZones(response.data.data);
// // //         } catch (error) {
// // //           console.error("Error fetching zones:", error);
// // //         }
// // //       }
// // //     }
// // //     fetchZones();
// // //   }, [selectedWarehouse]);

// // //   // Fetch expired products based on selected warehouse and zone
// // //   useEffect(() => {
// // //     async function fetchExpiredProducts() {
// // //       if (selectedWarehouse && selectedZone) {
// // //         try {
// // //           const response = await MyAxios.get("/expired-products", {
// // //             params: {
// // //               warehouse_id: selectedWarehouse.id,
// // //               zone_id: selectedZone.id,
// // //             },
// // //           });
// // //           setProductsByWarehouse((prevProducts) => ({
// // //             ...prevProducts,
// // //             [selectedWarehouse.id]: response.data.data,
// // //           }));
// // //         } catch (error) {
// // //           console.error("Error fetching expired products:", error);
// // //         }
// // //       }
// // //     }
// // //     fetchExpiredProducts();
// // //   }, [selectedWarehouse, selectedZone]);

// // //   const handleWarehouseSelect = (warehouse) => {
// // //     setSelectedWarehouse(warehouse);
// // //     setSelectedZone(null); // Reset zone selection when warehouse changes
// // //   };

// // //   const handleZoneSelect = (zone) => {
// // //     setSelectedZone(zone);
// // //   };

// // //   const handleProductSelect = (productId) => {
// // //     const selectedProduct = productsByWarehouse[selectedWarehouse.id].find((p) => p.id === productId);
// // //     setSelectedProduct(selectedProduct);
// // //   };

// // //   const handleCloseModal = () => {
// // //     setShowModal(false);
// // //   };

// // //   const handleConfirmDisposal = () => {
// // //     // Handle submission logic here
// // //     // Example: Submit selectedProduct and reason to disposal API
// // //     console.log("Selected product for disposal:", selectedProduct);
// // //     console.log("Disposal reason:", reason);
// // //     setShowModal(false);
// // //   };

// // //   const handleCreateDisposal = () => {
// // //     setShowModal(true);
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>Product Disposal</h2>
// // //       <Form.Group className="mb-3">
// // //         <Form.Label>Select Warehouse</Form.Label>
// // //         <Form.Select onChange={(e) => handleWarehouseSelect(JSON.parse(e.target.value))}>
// // //           <option>Select Warehouse...</option>
// // //           {warehouses.map((warehouse) => (
// // //             <option key={warehouse.id} value={JSON.stringify(warehouse)}>
// // //               {warehouse.name}
// // //             </option>
// // //           ))}
// // //         </Form.Select>
// // //       </Form.Group>

// // //       {selectedWarehouse && (
// // //         <Form.Group className="mb-3">
// // //           <Form.Label>Select Zone</Form.Label>
// // //           <Form.Select onChange={(e) => handleZoneSelect(JSON.parse(e.target.value))}>
// // //             <option>Select Zone...</option>
// // //             {zones.map((zone) => (
// // //               <option key={zone.id} value={JSON.stringify(zone)}>
// // //                 {zone.name}
// // //               </option>
// // //             ))}
// // //           </Form.Select>
// // //         </Form.Group>
// // //       )}

// // //       {selectedZone && (
// // //         <>
// // //           <Form.Group className="mb-3">
// // //             <Form.Label>Select Product to Dispose</Form.Label>
// // //             <Form.Select onChange={(e) => handleProductSelect(parseInt(e.target.value))}>
// // //               <option>Select Product...</option>
// // //               {productsByWarehouse[selectedWarehouse.id]?.map((product) => (
// // //                 <option key={product.id} value={product.id}>
// // //                   {product.product_name} - Expire Date: {product.expire_date}
// // //                 </option>
// // //               ))}
// // //             </Form.Select>
// // //           </Form.Group>

// // //           <Form.Group className="mb-3">
// // //             <Form.Label>Disposal Reason</Form.Label>
// // //             <Form.Control
// // //               as="textarea"
// // //               rows={3}
// // //               value={reason}
// // //               onChange={(e) => setReason(e.target.value)}
// // //             />
// // //           </Form.Group>

// // //           <Button variant="danger" onClick={handleCreateDisposal}>
// // //             Create Disposal
// // //           </Button>
// // //         </>
// // //       )}

// // //       <ConfirmModal
// // //         show={showModal}
// // //         handleClose={handleCloseModal}
// // //         handleConfirm={handleConfirmDisposal}
// // //         title="Confirm Disposal"
// // //         body={`Are you sure you want to dispose selected product?`}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default DisposalPage;
// import React, {  useEffect, useState } from "react";
// import {
//     Modal,
//     Form,
//     Button,
//     Row,
//     Col,
//     FormGroup,
//     FormLabel,
//     FormControl,
//     Table,
//     FormSelect,
//     Toast,
// } from "react-bootstrap";
// const CreateDisposal = () => {

//     const [formData, setFormData] = useState({});

//     // const [formErrors, setFormErrors] = useState({});





//     // console.log(errors);
//     // setFormErrors(errors);
//     // return Object.keys(errors).length === 0;



// return (
//     <>
//         <div className="container">
//             <div className="form-group">
//                 <Modal.Header>
//                     <Modal.Title>Create Disposal</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {/* <select className="form-control" defaultValue="select warehouse" disabled>
//           <option value="Khòndnfk">--Select warehouse--</option>
//           <option value="Kho Quang Ninh">Kho Quang Ninh</option>

//         </select> */}

//                     <Form>
//                         <Row className="mb-3">
//                             <Col>
//                                 <FormGroup>
//                                     <FormLabel>
//                                         <strong>Warehouse</strong>
//                                     </FormLabel>
//                                     {/* //select */}
//                                     {/* <Form.Select
//                     value={formData?.warehouse_id}
//                     disabled={!isAdmin}
//                     onChange={(e) => setFormData({ ...formData, warehouse_id: e.target.value })}
//                   >
//                     {props.warehouseList?.length > 0 &&
//                       props.warehouseList.map((warehouse) => (
//                         <option key={warehouse.id} value={warehouse.id}>
//                           {warehouse.name}
//                         </option>
//                       ))}
//                   </Form.Select> */}

// <FormSelect
//                             value={formData.details[index]?.zone_id}
//                             onChange={(e) => {
//                               handleUpdateFormDetail(index, "zone_id", e.target.value);
//                             }}
//                           >
//                             <option value="-1">--Choose zone--</option>
//                             {props?.zoneList?.map(
//                               (zone) =>
//                                 zone.warehouse_id == formData.warehouse_id && (
//                                   <option key={zone.id} value={zone.id}>
//                                     {zone.name}
//                                   </option>
//                                 )
//                             )}
//                           </FormSelect>
//                                     <FormSelect
//                             value={formData.details[index]?.zone_id}
//                             onChange={(e) => {
//                               handleUpdateFormDetail(index, "zone_id", e.target.value);
//                             }}
//                           >
//                             <option value="-1">--Choose zone--</option>
//                             {props?.zoneList?.map(
//                               (zone) =>
//                                 zone.warehouse_id == formData.warehouse_id && (
//                                   <option key={zone.id} value={zone.id}>
//                                     {zone.name}
//                                   </option>
//                                 )
//                             )}
//                           </FormSelect>

//                                 </FormGroup>



//                                 <FormGroup>
//                                     <FormLabel className="mt-3">
//                                         <strong>Products</strong>
//                                         {/* <span className="text-danger ms-5"> {formErrors.products}</span> */}
//                                     </FormLabel>


//                                     <Table striped responsive size="sm">
//                                         <thead>
//                                             <tr>
//                                                 <th>Product</th>
//                                                 {/* <th>Image</th> */}
//                                                 <th>Expire Date</th>
//                                                 <th>Quantity</th>
//                                                 {/* <th>Zone</th> */}
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>




//                                     </Table>






//                                 </FormGroup>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Modal.Body>
















//             </div>

//         </div>
//     </>
// )
// }

// export default CreateDisposal

import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";

const CreateDisposalPage = () => {
  const [formData, setFormData] = useState({
    warehouse: "",
    zone: "",
    product: "",
    expireDate: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MyAxios.post("/goods_disposal/create", formData);
      console.log("Disposal created:", response.data);
      // Handle success, e.g., show a success message or navigate to another page
    } catch (error) {
      console.error("Error creating disposal:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Create Goods Disposal</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formWarehouse">
              <Form.Label>Warehouse</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter warehouse"
                name="warehouse"
                value={formData.warehouse}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formZone">
              <Form.Label>Zone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zone"
                name="zone"
                value={formData.zone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProduct">
              <Form.Label>Product</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formExpireDate">
              <Form.Label>Expire Date</Form.Label>
              <Form.Control
                type="date"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formReason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* <Button variant="primary" type="submit">
              Create Disposal
            </Button> */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateDisposalPage;
