import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

//Style
const alertStyle = {
  position: "fixed",
  top: "50px",
  right: "50px",
  width: "25%" /* Adjust width to 1/4 of the screen */,
};
const MyAlert = ({ message, variant, show, setShow }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return (
    show && (
      <div style={alertStyle}>
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      </div>
    )
  );
};

export default MyAlert;
