import React, { useState } from "react";
import DeleteZone from "./warehouse/DeleteZone";

export default function TestComponent() {
  const zoneToDelete = { id: 2, name: "Zone Atse", warehouse_id: 1 };
  const [show, setShow] = useState(true);
  return (
    <>
      <DeleteZone
        zone={zoneToDelete}
        show={show}
        setShow={setShow}
      ></DeleteZone>
    </>
  );
}
