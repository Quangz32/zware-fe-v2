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

// Props contains: show, setShow, mode, user(for edit), warehouseList
export default function ProductForm(props) {
  // MyAlert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [warehouseList, setWarehouseList] = useState([]);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  //Set warehouseList
  useEffect(() => {
    setWarehouseList(props.warehouseList);
  }, [props]);

  //Set formData
  useEffect(() => {
    if (props.mode === "edit") {
      setFormData(props.user);
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

  //Validation
  const handleValidation = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Email is not valid";
      }
    }
    if (!formData.name) errors.name = "Name is required";
    if (props.mode === "add") {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 6) {
        errors.password = "Password minimum length is 6";
      }
      if (formData.password !== formData.confirm_password) {
        errors.confirm_password = "Passwords do not match";
      }
    }

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      errors.phone = "Phone is not valid";
    }

    if (!formData.role) errors.role = "Role is required";
    if (formData.role === "manager" && !formData.warehouse_id)
      errors.warehouse_id = "Warehouse is required for manager role";

    setFormErrors(errors);
    return Object.keys(errors).length === 0; //no error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    const filtedForm = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== "") {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    let newUserInfo;

    const handlePost = async () => {
      //CALL POST
      await MyAxios.post("users", filtedForm)
        .then((res) => {
          newUserInfo = res.data.data;
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          setShowAlert(true); //show Alert
        })
        .catch((e) => {
          //display message
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          setShowAlert(true); //show Alert
        });
    };

    const handlePut = async () => {
      await MyAxios.put(`users/${filtedForm.id}`, filtedForm)
        .then((res) => {
          newUserInfo = res.data.data;
          console.log(res);
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          setShowAlert(true); // show Alert
        })
        .catch((e) => {
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          setShowAlert(true); // show Alert
        });
    };

    const handleUploadImage = async () => {
      const imageFile = document.getElementById("uploaded-image-usr113").files[0];
      if (!imageFile) return;

      const formDataImg = new FormData();
      formDataImg.append("file", imageFile);

      await axios.post(`http://localhost:2000/api/users/${newUserInfo.id}/avatars`, formDataImg, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    };

    if (props.mode === "edit") {
      await handlePut();
    } else {
      await handlePost();
    }

    if (newUserInfo && Object.keys(newUserInfo).length > 0) {
      await handleUploadImage();
    }

    props.setShow(false); // Close Modal
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.setShow(false); // Close Modal
        }}
      >
        <Modal.Header>
          <Modal.Title>{props.mode === "edit" ? "Edit User" : "Add new user"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    disabled={props.mode === "edit"}
                    type="text"
                    value={formData.email}
                    isInvalid={!!formErrors.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    type="text"
                    value={formData.name}
                    isInvalid={!!formErrors.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
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
                      isInvalid={!!formErrors.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.password}
                    </Form.Control.Feedback>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                      type="password"
                      value={formData.confirm_password}
                      isInvalid={!!formErrors.confirm_password}
                      onChange={(e) =>
                        setFormData({ ...formData, confirm_password: e.target.value })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.confirm_password}
                    </Form.Control.Feedback>
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
                    isInvalid={!!formErrors.role}
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
                  <Form.Control.Feedback type="invalid">{formErrors.role}</Form.Control.Feedback>
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
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <FormLabel>Phone</FormLabel>
                <FormControl
                  type="text"
                  value={formData.phone}
                  isInvalid={!!formErrors.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
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
            {formData.role === "manager" && (
              <Row className="mb-3">
                <Col>
                  <FormLabel>Warehouse to manage</FormLabel>
                  <FormSelect
                    value={formData.warehouse_id}
                    isInvalid={!!formErrors.warehouse_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        warehouse_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Warehouse</option>
                    {warehouseList &&
                      warehouseList.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.warehouse_id}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            )}
            {formData.role === "manager" && (
              <Row className="mb-3">
                <FormGroup>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl type="file" id="uploaded-image-usr113" />
                </FormGroup>
              </Row>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button
            variant="secondary"
            onClick={() => {
              props.setShow(false);
              setFormErrors({});
            }}
          >
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            {props.mode === "edit" ? "Edit user" : "Save user"}
          </Button>
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
