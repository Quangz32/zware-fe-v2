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

export default function ChangeStatus(props) {
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleSubmit = () => {
    console.log("handle submit");
    MyAxios.put(`internal_transactions/${props.transaction.id}/change_status`, {
      status: status,
    })
      .then((res) => {
        if (res.status === 200) {
          props.setShow(false);
          setShowNotification(true);
          setToastVariant("success");
          setNotificationMessage("Change transaction status success!");
          props.triggerRender();
        }
      })
      .catch((e) => {
        console.log(e);
        props.setShow(false);
        setNotificationMessage(e.response.data.message);
        setToastVariant("warning");
        setShowNotification(true);
        props.triggerRender();
      });
  };

  useEffect(() => {
    const currentStatus = props?.transaction?.status;
    const isAdmin = props.isAdmin;
    const isInbound = props.transaction?.type === "inbound";
    const isDestinationWarehouse = props.isDestinationWarehouse;
    const isPending = currentStatus === "pending";

    if (props.canOnlyCancel) {
      setStatus("canceled");
    } else if (isInbound && !isAdmin && isDestinationWarehouse && isPending) {
      setStatus("canceled");
    } else if (currentStatus === "pending") {
      setStatus("shipping");
    } else if (currentStatus === "shipping") {
      setStatus("completed");
    }
  }, [props]);

  const canOnlyCancel =
    props.canOnlyCancel ||
    (props.transaction?.type === "inbound" &&
      !props.isAdmin &&
      props.isDestinationWarehouse &&
      props.transaction?.status === "pending");

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
              disabled={canOnlyCancel}
            >
              {canOnlyCancel ? (
                <option value="canceled">Canceled</option>
              ) : (
                <>
                  <option value="pending" disabled>
                    Pending
                  </option>
                  <option
                    value="shipping"
                    disabled={props.transaction?.status !== "pending"}
                  >
                    Shipping
                  </option>
                  <option
                    value="completed"
                    disabled={props.transaction?.status !== "shipping"}
                  >
                    Completed
                  </option>
                  <option value="canceled">Canceled</option>
                </>
              )}
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
        variant={toastVariant}
        show={showNotification}
        setShow={setShowNotification}
        message={notificationMessage}
      ></MyToast>
    </>
  );
}
