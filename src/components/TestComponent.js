import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MyAlert from "./share/MyAlert";

const TestComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const triggerAlert = () => {
    setShowAlert(true);
  };

  return (
    <div className="">
      <Button onClick={triggerAlert}>Show Alert</Button>
      <MyAlert
        message="This is a notification message This is a notification message"
        variant="success"
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
};

export default TestComponent;
