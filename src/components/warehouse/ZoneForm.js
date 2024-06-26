import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import MyAlert from "../share/MyAlert";

//props: mode (edit or add), zone {name and warehouse_id}, show, setShow
export default function ZoneForm({ mode, zone, show, setShow }) {
  // MyAlert state and functions
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const triggerAlert = () => {
    setShowAlert(true);
  };

  //Zone FORM
  const initZone = { id: 0, name: "", warehouse_id: 0 };
  const [zoneForm, setZoneForm] = useState(initZone);

  const handleCloseZoneModal = () => {
    setShow(false);
  };

  const handleSumit = async () => {
    if (mode === "edit") {
      await handlePut();
    } else {
      await handlePost();
    }

    setShow(false);
  };

  const handlePost = async () => {
    await MyAxios.post(`zones`, zoneForm)
      .then((res) => {
        if (res.status === 200) {
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status !== 200) {
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          triggerAlert();
        }
      });
  };
  const handlePut = async () => {
    await MyAxios.put(`zones/${zoneForm.id}`, zoneForm)
      .then((res) => {
        if (res.status === 200) {
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status !== 200) {
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          triggerAlert();
        }
      });
  };

  useEffect(() => {
    setZoneForm(zone);
  }, [zone]);

  return (
    <>
      {/* Add/Edit Zone Modal */}
      <Modal show={show} onHide={handleCloseZoneModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "edit" ? "Edit Zone" : "Add Zone"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Zone Name</Form.Label>
              <Form.Control
                type="text"
                value={zoneForm.name}
                onChange={(e) =>
                  setZoneForm({ ...zoneForm, name: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseZoneModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSumit}>
            {mode === "edit" ? "Update Zone" : "Save Zone"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Alert Modal */}
      <MyAlert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        setShow={setShowAlert}
      />
    </>
  );
}
