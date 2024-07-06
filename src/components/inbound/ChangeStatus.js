import React from "react";
import { Button, Form, FormLabel, FormSelect, Modal } from "react-bootstrap";

//props: show, setShow, transaction
export default function ChangeStatus(props) {
  const handleSubmit = () => {
    console.log("handle submit");
  };

  console.log(props.transaction);
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
      }}
    >
      <Modal.Header>
        <Modal.Title>Change status of Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <FormLabel>
            <strong>Status</strong>
          </FormLabel>
          <FormSelect>
            <option value={"pending"} disabled>
              Pending
            </option>
            {/* <option>{props.transaction?.status}</option> */}
            <option value={"shipping"} disabled={props.transaction?.status !== "pending"}>
              Shipping
            </option>
            <option value={"completed"} disabled={props.transaction?.status !== "shipping"}>
              Completed
            </option>
            <option value={"canceled"}>Canceled</option>
          </FormSelect>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.setShow(false);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
