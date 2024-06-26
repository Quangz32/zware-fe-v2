import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import MyAlert from "../share/MyAlert";

import MyAxios from "../../util/MyAxios";
import axios from "axios"; //for image upload

//Props contains: show, setShow, mode, user(for edit)
export default function ProductForm(props) {
  // MyAlert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // const handleSubmit = async () => {
  //   let newUserInfo = {};

  //   const handlePost = async () => {
  //     //CALL POST
  //     await MyAxios.post("products", formData)
  //       .then((res) => {
  //         newProduct = res.data.data;
  //         //display message
  //         setAlertMessage(res.data.message);
  //         setAlertVariant("success");
  //         setShowAlert(true); //show Alert
  //       })
  //       .catch((e) => {
  //         console.log(e);

  //         //display message
  //         setAlertMessage(e.response.data.message);
  //         setAlertVariant("warning");
  //         setShowAlert(true); //show Alert
  //       });
  //   };

  //   const handlePut = async () => {
  //     //CALL POST
  //     await MyAxios.put(`products/${formData.id}`, formData)
  //       .then((res) => {
  //         newProduct = res.data.data;
  //         //display message
  //         setAlertMessage(res.data.message);
  //         setAlertVariant("success");
  //         setShowAlert(true); //show Alert
  //       })
  //       .catch((e) => {
  //         console.log(e);

  //         //display message
  //         setAlertMessage(e.response.data.message);
  //         setAlertVariant("warning");
  //         setShowAlert(true); //show Alert
  //       });
  //   };

  //   const handleUploadImage = async () => {
  //     const imageFile = document.getElementById("uploaded-image-usr113").files[0];
  //     if (!imageFile) return;

  //     const formData = new FormData();
  //     formData.append("image", imageFile);

  //     const response = await axios.post(
  //       `http://localhost:2000/api/products/${newProduct.id}/image`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //   };

  //   if (props.mode === "edit") {
  //     await handlePut();
  //   } else {
  //     await handlePost();
  //   }

  //   //if Object is not empty
  //   if (Object.keys(newUserInfo).length > 0) {
  //     console.log(newUserInfo);
  //     await handleUploadImage();
  //   }

  //   props.setShow(false); //Close Modal
  // };

  const [warehouseList, setWarehouseList] = useState("");
  useEffect(() => {
    const fetchWarehouses = async () => {
      await MyAxios.get("warehouses")
        .then((res) => {
          // console.log(res);
          setWarehouseList(res.data.data);
        })
        .catch((e) => {});
    };
    fetchWarehouses();
  }, []);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (props.mode === "edit") {
      setFormData(props.user);
      // console.log(formData);
    } else {
      setFormData({
        email: "",
        name: "",
        password: "",
        confirm_password: "",
        role: "manager",
        date_of_birth: "",
        gender: "male",
        phone: "",
        warehouse_id: "",
      });
    }
  }, [props]);

  // console.log(JSON.stringify(formData));
  // console.log(warehouseList);
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.setShow(false); //Close Modal
        }}
      >
        <Modal.Header>
          <Modal.Title>{props.mode === "edit" ? "Edit User" : "Add new user"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  ></FormControl>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  ></FormControl>
                </FormGroup>
              </Col>
            </Row>
            {props.mode === "add" && (
              <Row className="mb-3">
                <Col>
                  <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    ></FormControl>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                      type="password"
                      value={formData.confirm_password}
                      onChange={(e) =>
                        setFormData({ ...formData, confirm_password: e.target.value })
                      }
                    ></FormControl>
                  </FormGroup>
                </Col>
              </Row>
            )}

            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>Role</FormLabel>
                  <FormSelect
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col>
                <FormLabel>Date of birth</FormLabel>
                <FormControl
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date_of_birth: e.target.value,
                    })
                  }
                ></FormControl>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormLabel>Phone</FormLabel>
                <FormControl
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                ></FormControl>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Gender</FormLabel>
                  <FormSelect
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </FormSelect>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <FormLabel>Warehouse to manage</FormLabel>
              <FormSelect
                value={formData.warehouse_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    warehouse_id: e.target.value,
                  })
                }
              >
                {/* <option value disabled></option> */}
                {warehouseList &&
                  warehouseList.map((warehouse) => (
                    <option value={warehouse.id}>{warehouse.name}</option>
                  ))}
              </FormSelect>
            </Row>

            <Row>
              <FormGroup>
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" id="uploaded-image-usr113"></Form.Control>
              </FormGroup>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.setShow(false); //Close Modal
            }}
          >
            Close
          </Button>
          <Button variant="primary">{props.mode === "edit" ? "Update User" : "Save User"}</Button>
        </Modal.Footer>
      </Modal>

      {/* ALERT */}
      <MyAlert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        setShow={setShowAlert}
      />
    </>
  );
}
