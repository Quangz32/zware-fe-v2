import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Table,
  FormGroup,
  FormLabel,
  FormSelect,
  Toast,
} from "react-bootstrap";
import MyAxios from "../../util/MyAxios";

export default function CreateInboundTransaction(props) {
  const [formData, setFormData] = useState({
    type: "inbound",
    source_warehouse: "",
    destination_warehouse: "",
    details: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (props.selectedOrder && props.selectedOrder.details) {
      const { source_warehouse, destination_warehouse } = props.selectedOrder;
      setFormData({
        type: "inbound",
        source_warehouse: getWarehouseName(source_warehouse),
        destination_warehouse: getWarehouseName(destination_warehouse),
        details: props.selectedOrder.details.map((detail) => ({
          ...detail,
          destination_zone: "",
        })),
      });
    }
  }, [props.selectedOrder]);

  const validateForm = () => {
    const errors = {};
    formData.details.forEach((detail, index) => {
      if (!detail.destination_zone) {
        errors[`zone_${index}`] = "Destination zone is required";
      }
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

  const handleDetailChange = (index, field, value) => {
    const newDetails = formData.details.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setFormData({ ...formData, details: newDetails });
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = props.warehouseList.find((w) => w.id === warehouseId);
    return warehouse ? warehouse.name : "Unknown";
  };

  const getProductName = (itemId) => {
    const item = props.itemList.find((item) => item.id === itemId);
    const product = props.productList.find((prd) => prd.id === item?.product_id);
    return product ? product.name : "Unknown";
  };

  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Inbound Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>
                Source Warehouse: {formData.source_warehouse}
              </FormLabel>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                Destination Warehouse: {formData.destination_warehouse}
              </FormLabel>
            </FormGroup>

            <FormGroup className="mt-3">
              <FormLabel>Products</FormLabel>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Destination Zone</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.details &&
                    formData.details.map((detail, index) => (
                      <tr key={index}>
                        <td>{getProductName(detail.item_id)}</td>
                        <td>{detail.quantity}</td>
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
                            isInvalid={!!formErrors[`zone_${index}`]}
                          >
                            <option value="">Select Zone</option>
                            {props.zoneList
                              ?.filter(
                                (zone) =>
                                  zone.warehouse_id ===
                                  props.selectedOrder.destination_warehouse
                              )
                              .map((zone) => (
                                <option key={zone.id} value={zone.id}>
                                  {zone.name}
                                </option>
                              ))}
                          </FormSelect>
                          {formErrors[`zone_${index}`] && (
                            <Form.Control.Feedback type="invalid">
                              {formErrors[`zone_${index}`]}
                            </Form.Control.Feedback>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
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
        style={{
          position: "fixed",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Inbound transaction created successfully!</Toast.Body>
      </Toast>
    </>
  );
}
