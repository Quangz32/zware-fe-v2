import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Button,
  Table,
  FormGroup,
  FormLabel,
  Toast,
} from "react-bootstrap";
import MyAxios from "../../util/MyAxios";

export default function UpdateInboundTransaction(props) {
  const [formData, setFormData] = useState({
    type: "inbound",
    source_warehouse: "",
    destination_warehouse: "",
    details: [],
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (props.selectedRequest) {
      setFormData({
        type: "inbound",
        source_warehouse: props.selectedRequest.source_warehouse,
        destination_warehouse: props.selectedRequest.destination_warehouse,
        details: props.selectedRequest.details.map((detail) => ({
          detail_id: detail.id,
          item_id: detail.item_id,
          quantity: detail.quantity,
          source_zone: detail.source_zone,
        })),
      });
    }
  }, [props.selectedRequest]);

  const handleConfirm = async () => {
    try {
      const response = await MyAxios.put(
        `internal_transactions/${props.selectedRequest.id}/confirm`,
        { status: "completed" }
      );

      if (response.status === 200) {
        props.setShow(false);
        setShowNotification(true);
        props.triggerRender();
      }
    } catch (error) {
      console.error("Error confirming inbound transaction:", error);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await MyAxios.put(
        `internal_transactions/${props.selectedRequest.id}/cancel`,
        { status: "cancelled" }
      );

      if (response.status === 200) {
        props.setShow(false);
        setShowNotification(true);
        props.triggerRender();
      }
    } catch (error) {
      console.error("Error cancelling inbound transaction:", error);
    }
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = props.warehouseList?.find((w) => w.id == warehouseId);
    return warehouse ? warehouse.name : "Unknown";
  };

  const getProductName = (itemId) => {
    if (!props.itemList || !props.productList) return "Unknown";
    const item = props.itemList.find((item) => item.id == itemId);
    if (!item) return "Unknown";
    const product = props.productList.find((prd) => prd.id == item.product_id);
    return product ? product.name : "Unknown";
  };

  const getZoneName = (zoneId) => {
    const zone = props.zoneList?.find((z) => z.id == zoneId);
    return zone ? zone.name : "Unknown";
  };

  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Inbound Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>
                Source Warehouse: {getWarehouseName(formData.source_warehouse)}
              </FormLabel>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                Destination Warehouse:{" "}
                {getWarehouseName(formData.destination_warehouse)}
              </FormLabel>
            </FormGroup>

            <FormGroup className="mt-3">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Source Zone</th> {/* Thêm cột Source Zone */}
                  </tr>
                </thead>
                <tbody>
                  {formData.details.map((detail, index) => (
                    <tr key={index}>
                      <td>{getProductName(detail.item_id)}</td>
                      <td>{detail.quantity}</td>
                      <td>{getZoneName(detail.source_zone)}</td>{" "}
                      {/* Hiển thị Source Zone */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => props.setShow(false)}>
            Close
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
        <Toast.Body>Inbound transaction updated successfully!</Toast.Body>
      </Toast>
    </>
  );
}
