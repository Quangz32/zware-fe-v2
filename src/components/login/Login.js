import React, { useState } from "react";
import MyAlert from "../share/MyAlert";
import MyAxios from "../../util/MyAxios";
import { useNavigate } from "react-router-dom";

//#Style

export default function Login() {
  //ALERT
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const triggerAlert = () => {
    setShowAlert(true);
  };

  //FORM DATA
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Navigate
  const navigate = useNavigate();

  //HANDLE Submit
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);

    await MyAxios.post("/auth/login", formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          //save jwt to local storage
          console.log(res.data);
          localStorage.setItem("token", res.data.data);

          //display message
          setAlertMessage(res.data.message);
          setAlertVariant("success");
          triggerAlert();

          //go to /home
          setTimeout(function () {
            navigate("/home");
          }, 1000);
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setAlertMessage(e.response.data.message);
          setAlertVariant("warning");
          triggerAlert();
        }
      });
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h4 className="mb-3">Welcome to Warehouse Management System</h4>
      <div className="card text-center" style={{ width: "400px" }}>
        <article className="card-body">
          {/* header */}
          <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
          <hr></hr>
          {/* message */}
          <form onSubmit={handleSubmit}>
            {/* email field */}
            <div className="form-group mb-3 mt-2">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="bi bi-person"></i>{" "}
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Email or login"
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                ></input>
              </div>
            </div>

            {/* password */}
            <div className="form-group mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="bi bi-shield-lock"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="******"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                ></input>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block w-75">
                Login
              </button>
            </div>
            <p className="text-center">
              <a href="#" className="btn">
                Forgot password?
              </a>
            </p>
          </form>
        </article>
      </div>

      {/* ALERT */}
      <MyAlert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
}
