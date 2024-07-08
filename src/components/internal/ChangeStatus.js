import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormLabel,
  FormSelect,
  Modal,
  Toast,
} from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import MyToast from "../share/MyToast";

//props: show, setShow, transaction, triggerRender
export default function ChangeStatus(props) {
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = () => {
    console.log("handle submit");
    MyAxios.put(`internal_transactions/${props.transaction.id}/change_status`, {
      status: status,
    }).then((res) => {
      if (res.status === 200) {
        props.setShow(false);
        setShowNotification(true);
        props.triggerRender();
      }
    });
  };

  useEffect(() => {
    const currentStatus = props?.transaction?.status;
    if (currentStatus == "pending") {
      setStatus("shipping");
    } else if (currentStatus == "shipping") {
      setStatus("completed");
    }
  }, [props]);

  // console.log(status);
  return (
    <>
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
            <FormSelect
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value={"pending"} disabled>
                Pending
              </option>
              {/* <option>{props.transaction?.status}</option> */}
              <option
                value={"shipping"}
                disabled={props.transaction?.status !== "pending"}
              >
                Shipping
              </option>
              <option
                value={"completed"}
                disabled={props.transaction?.status !== "shipping"}
              >
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

      <MyToast
        show={showNotification}
        setShow={setShowNotification}
        message={"Change transaction status success!"}
      ></MyToast>
    </>
  );
}
