import React, { useState } from "react";
import ConfirmModal from "../share/ConfirmModal";
import MyAlert from "../share/MyAlert";
import MyAxios from "../../util/MyAxios";

export default function DeleteWarehouse({ warehouse, show, setShow }) {
  // MyAlert state and functions
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const triggerAlert = () => {
    setShowAlert(true);
  };

  // Function: Delete warehouse
  async function deleteWarehouse(warehouse) {
    await MyAxios.delete(`warehouses/${warehouse.id}`)
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
        handleConfirm={() => deleteWarehouse(warehouse)}
        title="Confirm Deletion"
        body="Are you sure you want to delete this warehouse?"
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
