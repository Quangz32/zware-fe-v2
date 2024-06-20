import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import MyAlert from "../share/MyAlert";
import MyAxios from "../../util/MyAxios";

//props: mode (edit or add), warehouse {name and address}, show, setShow
export default function WarehouseForm({ mode, warehouse, show, setShow }) {
  const handleCloseModal = () => {
    setWarehouseForm(warehouse);
    setShow(false);
  };

  // MyAlert
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const triggerAlert = () => {
    setShowAlert(true);
  };

  const defaultWarehouseForm = {
    id: 0,
    name: "",
    address: "",
  };
  const [warehouseForm, setWarehouseForm] = useState(defaultWarehouseForm);

  useEffect(() => {
    setWarehouseForm(warehouse);
  }, [warehouse]);

  const handleSubmit = () => {
    if (mode === "add") {
      //CALL POST
      MyAxios.post("warehouses", warehouseForm)
        .then((res) => {
          //display message
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();

          // window.location.reload();
          //   setUpdateTrigger((prev) => !prev);
        })
        .catch((e) => {
          console.log(e);

          //display message
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          triggerAlert();
        });
    } else {
      //CALL PUT
      console.log(warehouseForm);
      MyAxios.put(`warehouses/${warehouseForm.id}`, warehouseForm)
        .then((res) => {
          //display message
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();

          // window.location.reload();
          //   setUpdateTrigger((prev) => !prev);
        })
        .catch((e) => {
          console.log(e);

          //display message
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          triggerAlert();
        });
    }
    handleCloseModal();
  };

  return (
    <>
      {/* Modal: Add/Edit Warehouse */}
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "edit" ? "Edit Warehouse" : "Add New Warehouse"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                <strong>Name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                value={warehouseForm.name}
                onChange={(e) =>
                  setWarehouseForm({ ...warehouseForm, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>
                <strong>Address</strong>
              </Form.Label>
              <Form.Control
                type="text"
                value={warehouseForm.address}
                onChange={(e) =>
                  setWarehouseForm({
                    ...warehouseForm,
                    address: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {mode === "edit" ? "Update Warehouse" : "Save Warehouse"}
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
