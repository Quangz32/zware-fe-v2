import React from "react";
import { Toast } from "react-bootstrap";

//props: show, setShow, message, variant
export default function MyToast(props) {
  return (
    <Toast
      className="position-fixed"
      style={{ top: "50px", right: "50px", zIndex: "9999" }}
      bg={props.variant ? props.variant : "primary"}
      show={props.show}
      onClose={() => {
        props.setShow(false);
      }}
      autohide={true}
      delay={6000}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Warehouse management</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body className="text-white">
        {props.message}
        <i className="ms-2 bi bi-check-circle"></i>
      </Toast.Body>
    </Toast>
  );
}
