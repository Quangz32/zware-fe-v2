import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormSelect,
  Table,
  FormControl,
  Toast,
} from "react-bootstrap";
import MyAxios from "../../util/MyAxios";

export default function CreateInboundTransaction(props) {
  const [formData, setFormData] = useState({
    type: "inbound",
    source_warehouse: "",
    destination_warehouse: "",
    details: [{ product_id: "", quantity: 0, destination_zone: "" }],
  });
  const [formErrors, setFormErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [destinationZones, setDestinationZones] = useState([]);

  useEffect(() => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    setIsAdmin(loggingUser.role === "admin");

    const destinationWarehouse = isAdmin ? "" : loggingUser.warehouse_id;

    setFormData((prevData) => ({
      ...prevData,
      destination_warehouse: destinationWarehouse,
    }));

    if (destinationWarehouse) {
      fetchDestinationZones(destinationWarehouse);
    }
  }, []);

  const fetchDestinationZones = async (warehouseId) => {
    try {
      const response = await MyAxios.get(`zones?warehouse_id=${warehouseId}`);
      if (response.status === 200) {
        setDestinationZones(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching destination zones:", error);
    }
  };

  const handleWarehouseChange = (e) => {
    const warehouseId = e.target.value;
    setFormData({ ...formData, destination_warehouse: warehouseId });
    fetchDestinationZones(warehouseId);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.source_warehouse)
      errors.source_warehouse = "Source warehouse is required";
    if (!formData.destination_warehouse)
      errors.destination_warehouse = "Destination warehouse is required";
    if (
      formData.source_warehouse.toString() ===
      formData.destination_warehouse.toString()
    )
      errors.source_warehouse =
        "Source and destination warehouses must be different";

    formData.details.forEach((detail, index) => {
      if (!detail.product_id)
        errors[`product_${index}`] = "Product is required";
      if (!detail.quantity || detail.quantity <= 0)
        errors[`quantity_${index}`] = "Quantity must be greater than 0";
      if (!detail.destination_zone)
        errors[`destination_zone_${index}`] = "Destination zone is required";
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await MyAxios.post(
        "internal_transactions/create",
        formData
      );
      if (response.status === 200) {
        props.setShow(false);
        setShowNotification(true);
        props.triggerRender();
      }
    } catch (error) {
      console.error("Error creating inbound transaction:", error);
    }
  };

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        { product_id: "", quantity: 0, destination_zone: "" },
      ],
    });
  };

  const handleRemoveDetail = (index) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({ ...formData, details: newDetails });
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = formData.details.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setFormData({ ...formData, details: newDetails });
  };

  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Inbound Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Source Warehouse</FormLabel>
                  <FormSelect
                    value={formData.source_warehouse}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        source_warehouse: e.target.value,
                      })
                    }
                    isInvalid={!!formErrors.source_warehouse}
                  >
                    <option value="">Select Source Warehouse</option>
                    {props.warehouseList?.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </FormSelect>
                  <FormControl.Feedback type="invalid">
                    {formErrors.source_warehouse}
                  </FormControl.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Destination Warehouse</FormLabel>
                  <FormSelect
                    value={formData.destination_warehouse}
                    onChange={handleWarehouseChange}
                    isInvalid={!!formErrors.destination_warehouse}
                    disabled={!isAdmin}
                  >
                    <option value="">Select Destination Warehouse</option>
                    {props.warehouseList?.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </FormSelect>
                  <FormControl.Feedback type="invalid">
                    {formErrors.destination_warehouse}
                  </FormControl.Feedback>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className="mt-3">
              <FormLabel>Products</FormLabel>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Destination Zone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.details.map((detail, index) => (
                    <tr key={index}>
                      <td>
                        <FormSelect
                          value={detail.product_id}
                          onChange={(e) =>
                            handleDetailChange(
                              index,
                              "product_id",
                              e.target.value
                            )
                          }
                          isInvalid={!!formErrors[`product_${index}`]}
                        >
                          <option value="">Select Product</option>
                          {props.productList?.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </FormSelect>
                        <FormControl.Feedback type="invalid">
                          {formErrors[`product_${index}`]}
                        </FormControl.Feedback>
                      </td>
                      <td>
                        <FormControl
                          type="number"
                          value={detail.quantity}
                          onChange={(e) =>
                            handleDetailChange(
                              index,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                          isInvalid={!!formErrors[`quantity_${index}`]}
                        />
                        <FormControl.Feedback type="invalid">
                          {formErrors[`quantity_${index}`]}
                        </FormControl.Feedback>
                      </td>
                      <td>
                        <FormSelect
                          value={detail.destination_zone}
                          onChange={(e) =>
                            handleDetailChange(
                              index,
                              "destination_zone",
                              e.target.value
                            )
                          }
                          isInvalid={!!formErrors[`destination_zone_${index}`]}
                        >
                          <option value="">Select Zone</option>
                          {destinationZones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.name}
                            </option>
                          ))}
                        </FormSelect>
                        <FormControl.Feedback type="invalid">
                          {formErrors[`destination_zone_${index}`]}
                        </FormControl.Feedback>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveDetail(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button onClick={handleAddDetail}>Add Product</Button>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Inbound Transaction
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={showNotification}
        onClose={() => setShowNotification(false)}
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20 }}
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Inbound transaction created successfully!</Toast.Body>
      </Toast>
    </>
  );
}
