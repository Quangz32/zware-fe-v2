import React, { useState } from "react";
import ConfirmModal from "../share/ConfirmModal";
import MyAlert from "../share/MyAlert";
import MyAxios from "../../util/MyAxios";

//props contains: show, setShow, user (to delete)
export default function UserDelete(props) {
  //   console.log(product);
  // MyAlert state and functions
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Function: Delete user
  async function deleteProduct(user) {
    await MyAxios.delete(`users/${user.id}`)
      .then((res) => {
        if (res.status === 200) {
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          setShowAlert(true);
        }
      })
      .catch((e) => {
        if (e.response.status !== 200) {
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          setShowAlert(true);
        }
      });

    props.setShow(false);
  }

  return (
    <>
      {/* Confirm Modal */}
      <ConfirmModal
        show={props.show}
        handleClose={() => props.setShow(false)}
        handleConfirm={() => deleteProduct(props.user)}
        title="Confirm Deletion"
        body="Are you sure to delete this user?"
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
