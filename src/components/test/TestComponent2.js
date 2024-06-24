import React, { useState } from "react";
import WarehouseForm from "../warehouse/WarehouseForm";
import { Button } from "react-bootstrap";

export default function TestComponent2() {
  const [showModal, setShowModal] = useState(false);
  const warehouse = {
    id: 8,
    name: "Shit",
    address: "Mountain",
  };
  return (
    <div className="App">
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Edit
      </Button>
      <WarehouseForm mode="add" warehouse={warehouse} show={showModal} setShow={setShowModal} />
    </div>
  );
}
