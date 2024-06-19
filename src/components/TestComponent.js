import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyAlert from "./share/MyAlert";
import ProductCard from "./product/ProductCard";
import ConfirmModal from "./share/ConfirmModal";

const TestComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleConfirm = () => {
    console.log("Confirmed!");
    setShowModal(false);
  };

  return (
    <div className="App">
      <Button variant="danger" onClick={handleShow}>
        Delete Item
      </Button>

      <ConfirmModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        title="Confirm Deletion"
        body="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default TestComponent;
