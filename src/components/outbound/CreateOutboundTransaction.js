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

//props: show, setShow, warehouseList, productList, triggerRender
export default function CreateOutboundTransaction(props) {
  const handleSubmit = async () => {
    console.log("submit");
    console.log(formData);
    if (!validateForm()) return;

    await MyAxios.post("outbound_transactions/create", formData).then((res) => {
      if (res.status === 200) {
        props.setShow(false);
        setShowNotification(true);
        props.triggerRender();
      }
    });
  };

  //formData1: warehouse_id, destination
  //formData2: details , [{productid, expiredate, quantity, zone}]
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [availableQuantity, setAvailableQuantity] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (formData.destination === "") errors.destination = "Destination is required";

    formData.details.forEach((inboundDetail) => {
      const quantityNumber = parseInt(inboundDetail.quantity);
      if (quantityNumber < 1) {
        errors.products = "Quantity must be bigger than 0";
        return false;
      }

      if (quantityNumber > getAvailableQuantity(inboundDetail.product_id)) {
        errors.products = "Quantity of some product is not not enough";
      }
    });
    // if (formData.expire_date === "") errors.expire_date = "Expire date is required";

    console.log(errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFormDetail = () => {
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        {
          product_id: props.productList[0]?.id,
          quantity: 0,
        },
      ],
    });
  };

  const handleRemoveFormDetail = (indexToRemove) => {
    console.log("Remove " + indexToRemove);
    setFormData({
      ...formData,
      details: formData.details.filter((_, index) => index !== indexToRemove),
    });
    console.log(formData);
  };

  const handleUpdateFormDetail = (indexToUpdate, field, updateValue) => {
    const newDetails = formData.details.map((inboundDetail, index) =>
      index === indexToUpdate ? { ...inboundDetail, [field]: updateValue } : inboundDetail
    );
    setFormData({ ...formData, details: newDetails });
  };

  const getAvailableQuantity = (productId) => {
    return availableQuantity.find((element) => element.productId == productId)?.quantity;
  };

  useEffect(() => {
    const initFormData = () => {
      const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));
      if (loggingUser.role === "admin") setIsAdmin(true);

      const selectedWarehouse =
        loggingUser?.role === "admin" ? props.warehouseList[0]?.id : loggingUser.warehouse_id;

      setFormData({
        warehouse_id: selectedWarehouse,
        destination: "",
        details: [
          {
            product_id: props.productList[0]?.id,
            quantity: 0,
          },
        ],
      });
    };

    initFormData();
  }, [props]);

  useEffect(() => {
    const fetchAvailableQuantity = async () => {
      if (!formData.warehouse_id) return;
      await MyAxios.get(`products/non_expire_quantity?warehouse_id=${formData.warehouse_id}`).then(
        (res) => {
          if (res.status === 200) {
            setAvailableQuantity(res.data.data);
          }
        }
      );
    };
    fetchAvailableQuantity();
  }, [formData]);

  // console.log(availableQuantity);

  return (
    <div>
      <Modal
        size="md"
        show={props.show}
        onHide={() => {
          props.setShow(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Create Outbound Transaction</Modal.Title>
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
                    <strong>Destination</strong>
                  </FormLabel>
                  <FormControl
                    type="text"
                    value={formData.destination}
                    isInvalid={!!formErrors.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                  <FormControl.Feedback type="invalid">
                    {formErrors.destination}
                  </FormControl.Feedback>
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
                      <th>Quantity</th>
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
                          <div className="d-flex flex-row align-items-center">
                            <FormControl
                              type="number"
                              value={formData.details[index]?.quantity}
                              onChange={(e) => {
                                handleUpdateFormDetail(index, "quantity", e.target.value);
                              }}
                            ></FormControl>
                            <label className="ps-1 pe-3 text-muted">
                              /{getAvailableQuantity(formData.details[index]?.product_id)}
                            </label>
                          </div>
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
          Outbound Transaction has been created!<i className="ms-2 bi bi-check-circle"></i>
        </Toast.Body>
      </Toast>
    </div>
  );
}
