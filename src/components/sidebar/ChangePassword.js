import React, { useState } from "react";
import { Modal, Form, Row, Col, FormGroup, FormControl, Button, FormLabel } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import MyToast from "../share/MyToast";
//props: show, setShow
export default function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleSubmit = async () => {
    if (!validateForm()) return;
    console.log("submit change pas");
    await MyAxios.put("auth/change_password", {
      old_password: currentPassword,
      new_password: newPassword,
    })
      .then((res) => {
        props.setShow(false);
        setToastMessage("Your password has been changed");
        setShowToast(true);
      })
      .catch((e) => {
        props.setShow(false);
        setToastMessage(e.response.data.message);
        setToastVariant("warning");
        setShowToast(true);
      });

    setCurrentPassword("");
    setNewPassword("");
  };

  const validateForm = () => {
    let errors_temp = {};
    if (currentPassword === "") {
      errors_temp.currentPassword = "This field is required";
    }

    if (newPassword === "") {
      errors_temp.newPassword = "This field is required";
    }

    if (newPassword.length < 6) {
      errors_temp.newPassword = "New password's length must be more than 6";
    }

    if (newPassword === currentPassword) {
      errors_temp.newPassword = "New password cannot same as current";
    }

    setErrors(errors_temp);
    return Object.keys(errors_temp).length === 0;
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.setShow(false);
        }}
        //   size="sm"
      >
        <Modal.Header>
          <Modal.Title>Change your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-3">
              <FormLabel>Current Password</FormLabel>
              <FormControl
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                isInvalid={!!errors.currentPassword}
              ></FormControl>
              <FormControl.Feedback type="invalid">{errors.currentPassword}</FormControl.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>New Password</FormLabel>
              <FormControl
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                isInvalid={!!errors.newPassword}
              ></FormControl>
              <FormControl.Feedback type="invalid">{errors.newPassword}</FormControl.Feedback>
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
            Change password
          </Button>
        </Modal.Footer>
      </Modal>
      <MyToast
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      ></MyToast>
    </>
  );
}
