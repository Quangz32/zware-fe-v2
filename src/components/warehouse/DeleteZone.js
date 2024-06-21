import React, { useState } from "react";
import ConfirmModal from "../share/ConfirmModal";
import MyAlert from "../share/MyAlert";
import MyAxios from "../../util/MyAxios";

export default function DeleteZone({ zone, show, setShow }) {
  console.log(zone);
  // MyAlert state and functions
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = () => {
    setShowAlert(true);
  };

  // Function: Delete warehouse
  async function deleteZone(zone) {
    await MyAxios.delete(`zones/${zone.id}`)
      .then((res) => {
        if (res.status === 200) {
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();
        }
      })
      .catch((e) => {
        if (e.response.status !== 200) {
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          triggerAlert();
        }
      });

    setShow(false);
  }

  return (
    <>
      {/* Confirm Modal */}
      <ConfirmModal
        show={show}
        handleClose={() => setShow(false)}
        handleConfirm={() => deleteZone(zone)}
        title="Confirm Deletion"
        body="Are you sure you want to delete this zone?"
      />

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
