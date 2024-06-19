import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import "../../mystyle.css";
import WarehouseList from "./WarehouseList";
import MyAlert from "../share/MyAlert";

const WarehouseManagement = () => {
  //change this value to re-render Warehouse List
  const [updateTrigger, setUpdateTrigger] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [warehouseForm, setWarehouseForm] = useState({
    id: 0,
    name: "",
    address: "",
  });
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [warehouseModalMode, setWarehouseModalMode] = useState(""); //only "edit" or "add"

  function handleCloseWarehouseModal() {
    setShowWarehouseModal(false);
  }

  function handleOpenWarehouseModal(modeString, WarehouseFormData) {
    setWarehouseModalMode(modeString);
    setWarehouseForm(WarehouseFormData);
    setShowWarehouseModal(true);
  }

  function handleSubmit() {
    if (warehouseModalMode === "add") {
      //CALL POST
      MyAxios.post("warehouses", warehouseForm)
        .then((res) => {
          //display message
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();

          // window.location.reload();
          setUpdateTrigger((prev) => !prev);
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
      MyAxios.put(`warehouses/${warehouseForm.id}`, warehouseForm)
        .then((res) => {
          //display message
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();

          // window.location.reload();
          setUpdateTrigger((prev) => !prev);
        })
        .catch((e) => {
          console.log(e);

          //display message
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          triggerAlert();
        });
    }

    handleCloseWarehouseModal();
  }

  //ALERT
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const triggerAlert = () => {
    setShowAlert(true);
  };

  return (
    <div className="container">
      {/* Add and Search */}
      <div className="d-flex">
        <Button
          variant="primary"
          className="mb-3 me-3"
          onClick={() =>
            handleOpenWarehouseModal("add", { id: 0, name: "", address: "" })
          }
        >
          <i className="bi bi-plus-circle me-1"></i>
          New Warehouse
        </Button>

        <span className="input-group mb-3 w-25">
          <span
            className="input-group-text my-cursor-pointer"
            id="basic-addon1"
          >
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search warehouse"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </span>
      </div>

      {/* Warehouse List */}
      <WarehouseList
        searchTerm={searchTerm}
        updateTrigger={updateTrigger}
        handleOpenWarehouseModal={handleOpenWarehouseModal}
        setWarehouseForm={setWarehouseForm}
      ></WarehouseList>

      {/* Modal: Add/Edit Warehouse */}
      <Modal show={showWarehouseModal} onHide={handleCloseWarehouseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {warehouseModalMode === "edit"
              ? "Edit Warehouse"
              : "Add New Warehouse"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                <strong>Warehouse Name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                value={warehouseForm.name}
                onChange={(e) =>
                  setWarehouseForm({ ...warehouseForm, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>
                <strong>Warehouse Address</strong>
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
          <Button variant="secondary" onClick={handleCloseWarehouseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {warehouseModalMode === "edit"
              ? "Update Warehouse"
              : "Save Warehouse"}
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
    </div>
  );
};

export default WarehouseManagement;
