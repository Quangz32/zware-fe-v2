import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
  FormSelect,
  Toast,
} from "react-bootstrap";

import MyAxios from "../../util/MyAxios";

// props: show, setShow, warehouseList, productList, triggerRender
export default function CreateInternalTransaction(props) {
  const handleSubmit = async () => {
    console.log("submit");
    console.log(formData);
    if (!validateForm()) return;

    await MyAxios.post("internal_transactions/create", formData).then((res) => {
      if (res.status === 200) {
        props.setShow(false);
        setShowNotification(true);
        props.triggerRender();
      }
    });
  };

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState([]);

  const validateForm = () => {
    const errors = {};
    if (formData.type === "") errors.type = "Type is required";
    if (formData.source_warehouse === "")
      errors.source_warehouse = "Source warehouse is required";
    if (formData.destination_warehouse === "")
      errors.destination_warehouse = "Destination warehouse is required";

    if (
      formData.source_warehouse.toString() ===
      formData.destination_warehouse.toString()
    )
      errors.destination_warehouse =
        "Ensure that an internal transaction is not created within the same warehouse."; 

    formData.details.forEach((detail) => {
      if (detail.product_id === "") {
        errors.products = "Product is required in all details";
        return false;
      }

      const quantityNumber = parseInt(detail.quantity);
      if (quantityNumber > 1000000000 || quantityNumber < 1) {
        errors.products =
          "Quantity must be bigger than 0 and smaller than 1 billion";
        return false;
      }

      if (formData.type === "inbound" && detail.destination_zone === "") {
        errors.products =
          "Destination zone is required for inbound transactions";
        return false;
      }
    });

    console.log(errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFormDetail = useCallback(() => {
    console.log("Add");
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        {
          product_id: props.productList[0]?.id,
          quantity: 0,
          destination_zone: formData.type === "inbound" ? "" : undefined,
        },
      ],
    });

    console.log(formData);
  });

  const handleRemoveFormDetail = (indexToRemove) => {
    console.log("Remove " + indexToRemove);
    setFormData({
      ...formData,
      details: formData.details.filter((_, index) => index != indexToRemove),
    });
    console.log(formData);
  };

  const handleUpdateFormDetail = (indexToUpdate, field, updateValue) => {
    const newDetails = formData.details.map((detail, index) =>
      index === indexToUpdate ? { ...detail, [field]: updateValue } : detail
    );
    setFormData({ ...formData, details: newDetails });
  };

  const getAvailableQuantity = (productId) => {
    return availableQuantity.find((element) => element.productId == productId)
      ?.quantity;
  };

  useEffect(() => {
    const fetchAvailableQuantity = async () => {
      if (!formData.source_warehouse) return;
      await MyAxios.get(`products/non_expire_quantity?warehouse_id=${formData.source_warehouse}`).then((res) => {
        if (res.status === 200) {
          setAvailableQuantity(res.data.data);
        }
      });
    };
    fetchAvailableQuantity();
  }, [formData]);

  useEffect(() => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    const isAdmin = loggingUser.role === "admin";
    setIsAdmin(isAdmin);

    const userWarehouseId = isAdmin ? null : loggingUser.warehouse_id;

    const initialData = {
      type: "inbound",
      source_warehouse: "",
      destination_warehouse: "",
      details: [
        {
          product_id: props.productList[0]?.id,
          quantity: 0,
          destination_zone: "",
        },
      ],
    };

    if (isAdmin) {
      setFormData(initialData);
    } else {
      if (initialData.type === "inbound") {
        setFormData({
          ...initialData,
          destination_warehouse: userWarehouseId,
        });
      } else {
        setFormData({
          ...initialData,
          type: "outbound",
          source_warehouse: userWarehouseId,
        });
      }
    }
  }, [props]);

  const handleTypeChange = (newType) => {
    if (isAdmin) {
      setFormData({ ...formData, type: newType });
    } else {
      const userWarehouseId = JSON.parse(
        localStorage.getItem("loggingUser")
      ).warehouse_id;
      if (newType === "inbound") {
        setFormData({
          ...formData,
          type: newType,
          source_warehouse: "",
          destination_warehouse: userWarehouseId,
        });
      } else {
        setFormData({
          ...formData,
          type: newType,
          source_warehouse: userWarehouseId,
          destination_warehouse: "",
        });
      }
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => {
          props.setShow(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Create Internal Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Type</strong>
                  </FormLabel>
                  <Form.Select
                    value={formData?.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                  >
                    <option value="inbound">Inbound</option>
                    <option value="outbound">Outbound</option>
                  </Form.Select>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Source Warehouse</strong>
                  </FormLabel>
                  <Form.Select
                    value={formData?.source_warehouse}
                    isInvalid={!!formErrors.source_warehouse}
                    disabled={!isAdmin && formData.type === "outbound"}
                    // disabled={!isAdmin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        source_warehouse: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Source Warehouse</option>
                    {props.warehouseList?.length > 0 &&
                      props.warehouseList.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                  </Form.Select>
                  <FormControl.Feedback type="invalid">
                    {formErrors.source_warehouse}
                  </FormControl.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Destination Warehouse</strong>
                  </FormLabel>
                  <Form.Select
                    value={formData?.destination_warehouse}
                    isInvalid={!!formErrors.destination_warehouse}
                    disabled={!isAdmin && formData.type === "inbound"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        destination_warehouse: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Destination Warehouse</option>
                    {props.warehouseList?.length > 0 &&
                      props.warehouseList.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                  </Form.Select>
                  <FormControl.Feedback type="invalid">
                    {formErrors.destination_warehouse}
                  </FormControl.Feedback>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <FormLabel className="mt-3">
                <strong>Products</strong>
                <span className="text-danger ms-5"> {formErrors.products}</span>
              </FormLabel>

              <Table striped responsive size="sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    {formData.type === "inbound" && <th>Destination Zone</th>}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData?.details?.map((detail, index) => (
                    <tr key={index}>
                      <td>
                        <FormSelect
                          value={detail.product_id}
                          onChange={(e) => {
                            handleUpdateFormDetail(
                              index,
                              "product_id",
                              e.target.value
                            );
                          }}
                        >
                          {props.productList?.map((product, index) => (
                            <option key={index} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </FormSelect>
                      </td>
                      <td>
                        <div className="d-flex flex-row align-items-center">
                          <FormControl
                            type="number"
                            value={detail.quantity}
                            onChange={(e) => {
                              handleUpdateFormDetail(
                                index,
                                "quantity",
                                e.target.value
                              );
                            }}
                          ></FormControl>
                          {formData.type == "outbound" && (
                            <label className="ps-1 pe-3 text-muted">
                              /
                              {getAvailableQuantity(
                                formData.details[index]?.product_id
                              )}
                            </label>
                          )}
                        </div>
                      </td>
                      {formData.type === "inbound" && (
                        <td>
                          <FormSelect
                            value={detail.destination_zone}
                            onChange={(e) => {
                              handleUpdateFormDetail(
                                index,
                                "destination_zone",
                                e.target.value
                              );
                            }}
                          >
                            <option value="">Select Zone</option>
                            {props?.zoneList?.map(
                              (zone) =>
                                zone.warehouse_id ==
                                  formData.destination_warehouse && (
                                  <option key={zone.id} value={zone.id}>
                                    {zone.name}
                                  </option>
                                )
                            )}
                          </FormSelect>
                        </td>
                      )}
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            console.log("Click delete");
                            handleRemoveFormDetail(index);
                          }}
                        >
                          <i className="bi bi-trash3"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-end pe-3 ">
                <Button onClick={handleAddFormDetail}>
                  <i className="bi bi-plus-lg"></i>
                </Button>
              </div>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.setShow(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        className="position-fixed"
        style={{ top: "50px", right: "50px" }}
        bg="primary"
        show={showNotification}
        onClose={() => {
          setShowNotification(false);
        }}
        autohide={true}
        delay={5000}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Warehouse management</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          Internal Transaction has been created!
          <i className="ms-2 bi bi-check-circle"></i>
        </Toast.Body>
      </Toast>
    </div>
  );
}