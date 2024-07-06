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

//props: show, setShow, warehouseList, productList
export default function CreateInboundTransaction(props) {
  //   const getProductName = (productId) => {
  //     const product = props.productList.find((element) => element.id === productId);
  //     return product?.name;
  //   };

  const handleSubmit = async () => {
    console.log("submit");
    console.log(formData);
    if (!validateForm()) return;

    await MyAxios.post("inbound_transactions/create", formData).then((res) => {
      if (res.status === 200) {
        props.setShow(false);
        setShowNotification(true);
      }
    });
  };

  //formData1: warehouse_id, source
  //formData2: details , [{productid, expiredate, quantity, zone}]
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (formData.source === "") errors.source = "Source is required";

    formData.details.forEach((inboundDetail) => {
      if (inboundDetail.expire_date === "") {
        errors.products = "Expire date is required in any product";
        return false;
      }

      const inputDate = new Date(inboundDetail.expire_date);
      const currentDate = new Date();
      if (inputDate <= currentDate) {
        errors.products = "Expire date must be in the future";
        return false;
      }

      const quantityNumber = parseInt(inboundDetail.quantity);
      if (quantityNumber > 1000000000 || quantityNumber < 1) {
        errors.products = "Quantity must be bigger than 0 and smaller than 1 billion";
        return false;
      }

      if (inboundDetail.zone_id == -1) {
        errors.products = "Zone is required in all product";
        return false;
      }
    });
    // if (formData.expire_date === "") errors.expire_date = "Expire date is required";

    console.log(errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFormDetail = useCallback(() => {
    console.log("ADd");
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        {
          product_id: props.productList[0]?.id,
          expire_date: "",
          quantity: 0,
          zone_id: -1,
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
    const newDetails = formData.details.map((inboundDetail, index) =>
      index === indexToUpdate ? { ...inboundDetail, [field]: updateValue } : inboundDetail
    );
    setFormData({ ...formData, details: newDetails });
  };

  //   const handleChange

  useEffect(() => {
    const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
    if (loggingUser.role === "admin") setIsAdmin(true);

    const selectedWarehouse =
      loggingUser?.role === "admin" ? props.warehouseList[0]?.id : loggingUser.warehouse_id;

    setFormData({
      warehouse_id: selectedWarehouse,
      source: "",
      details: [
        {
          product_id: props.productList[0]?.id,
          expire_date: "",
          quantity: 0,
          zone_id: -1,
        },
      ],
    });
  }, [props]);

  //   console.log(formData.detail);
  //   console.log(props.zoneList.find((zone) => zone.warehouse_id === 3));
  //   console.log(formErrors);
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
          <Modal.Title>Create Inbound Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Warehouse</strong>
                  </FormLabel>
                  <Form.Select
                    value={formData?.warehouse_id}
                    disabled={!isAdmin}
                    onChange={(e) => setFormData({ ...formData, warehouse_id: e.target.value })}
                  >
                    {props.warehouseList?.length > 0 &&
                      props.warehouseList.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                  </Form.Select>
                  {/* <FormControl.Feedback type="invalid">{formErrors.name}</FormControl.Feedback> */}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>
                    <strong>Source</strong>
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={formData.source}
                    isInvalid={!!formErrors.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  />
                  <FormControl.Feedback type="invalid">{formErrors.source}</FormControl.Feedback>
                </FormGroup>
              </Col>

              <FormGroup>
                <FormLabel className="mt-3">
                  <strong>Products</strong>
                  <span className="text-danger ms-5"> {formErrors.products}</span>
                </FormLabel>

                <Table striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      {/* <th>Image</th> */}
                      <th>Expire Date</th>
                      <th>Quantity</th>
                      <th>Zone</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData?.details?.map((inboundDetail, index) => (
                      <tr key={index}>
                        <td>
                          <FormSelect
                            value={inboundDetail.product_id}
                            onChange={(e) => {
                              handleUpdateFormDetail(index, "product_id", e.target.value);
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
                          <FormControl
                            type="date"
                            value={formData.details[index]?.expire_date}
                            onChange={(e) => {
                              handleUpdateFormDetail(index, "expire_date", e.target.value);
                            }}
                          ></FormControl>
                        </td>
                        <td>
                          <FormControl
                            type="number"
                            value={formData.details[index]?.quantity}
                            onChange={(e) => {
                              handleUpdateFormDetail(index, "quantity", e.target.value);
                            }}
                          ></FormControl>
                        </td>
                        <td>
                          <FormSelect
                            value={formData.details[index]?.zone_id}
                            onChange={(e) => {
                              handleUpdateFormDetail(index, "zone_id", e.target.value);
                            }}
                          >
                            <option value="-1">--Choose zone--</option>
                            {props?.zoneList?.map(
                              (zone) =>
                                zone.warehouse_id == formData.warehouse_id && (
                                  <option key={zone.id} value={zone.id}>
                                    {zone.name}
                                  </option>
                                )
                            )}
                          </FormSelect>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              console.log("CLick delete");
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
            </Row>
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
          Inbound Transaction has been created!<i className="ms-2 bi bi-check-circle"></i>
        </Toast.Body>
      </Toast>
    </div>
  );
}
