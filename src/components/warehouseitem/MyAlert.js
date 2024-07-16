import React, { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import TransactionManagement from "../transaction/TransactionManagement";
const alertStyle = {
  position: "fixed",
  top: "50px",
  right: "50px",
  width: "25%",
};

const MyAlert = ({ message, variant, show, setShow, link }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return (
    show && (
      <div style={alertStyle}>
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {message}
          <div className="mt-3">
            {/* <Button variant="primary" href={link}>
              Create DisposalGoods
            </Button> */}
          </div>
        </Alert>
      </div>
    )
  );
};

export default MyAlert;
