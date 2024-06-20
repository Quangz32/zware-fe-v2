import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyAlert from "./share/MyAlert";
import ProductCard from "./product/ProductCard";
import ConfirmModal from "./share/ConfirmModal";
import ZoneForm from "./warehouse/ZoneForm";

const TestComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const zone = {
    id: 1,
    name: "Shit",
    warehouse_id: 8,
  };
  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Edit
      </Button>
      <ZoneForm
        mode="add"
        zone={zone}
        show={showModal}
        setShow={setShowModal}
      />
    </>
  );
};

export default TestComponent;
