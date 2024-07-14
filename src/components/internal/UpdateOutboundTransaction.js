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

export default function UpdateOutboundTransaction(props) {
  const [formData, setFormData] = useState({
    type: "outbound",
    source_warehouse: "",
    destination_warehouse: "",
    details: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (props.selectedTransaction?.data && props.selectedOrder?.data) {
      setFormData({
        type: "outbound",
        source_warehouse: props.selectedTransaction.data.source_warehouse,
        destination_warehouse:
          props.selectedTransaction.data.destination_warehouse,
        details: props.selectedOrder.data.map((detail) => ({
          detail_id: detail.id,
          item_id: detail.item_id,
          quantity: detail.quantity,
          destination_zone: detail.destination_zone || "",
        })),
      });
    }
  }, [props.selectedTransaction, props.selectedOrder]);

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
     const destinationZones = [
       {
         detailId: props.selectedTransaction.data.id,
         destinationZones: formData.details
           .map((detail) => parseInt(detail.destination_zone))
           .filter((zone) => !isNaN(zone)),
       },
     ];

     console.log(destinationZones);

     const response = await MyAxios.put(
       `internal_transaction_details/${props.selectedTransaction.data.id}/destination_zones`,
       destinationZones
     );

     if (response.status === 200) {
       props.setShow(false);
       setShowNotification(true);
       props.triggerRender();
     }
   } catch (error) {
     console.error("Error updating outbound transaction:", error);
   }
 };

  // console.log("destination", props.selectedTransaction.data.id);

  const handleDetailChange = (index, field, value) => {
    const newDetails = formData.details.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setFormData({ ...formData, details: newDetails });
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

  return (
    <>
      <Modal show={props.show} onHide={() => props.setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Outbound Transaction</Modal.Title>
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
                    <th>Destination Zone</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.details.map((detail, index) => (
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
                                zone.warehouse_id ==
                                formData.destination_warehouse
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
          <Button variant="success" onClick={handleSubmit}>
            Confirm
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
        <Toast.Body>Outbound transaction updated successfully!</Toast.Body>
      </Toast>
    </>
  );
}
