import React, { useState } from "react";
import MyAlert from "../share/MyAlert";
import MyAxios from "../../util/MyAxios";
import { useNavigate } from "react-router-dom";

//Style
const containerStyle = {
  width: "400px",
  textAlign: "center",
  margin: "0px auto",
};

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
        // console.log(res.data);
        if (res.data.status === "success") {
          setAlertMessage("Login success");
          setAlertVariant("success");
          triggerAlert();

          setTimeout(function () {
            navigate("/home");
          }, 500);
        }
      })
      .catch((e) => {
        // console.log(e);
        if (e.response.data.status === "fail") {
          setAlertMessage("Email or password is invalid");
          setAlertVariant("warning");
          triggerAlert();
        }
      });
  }

  return (
    <div style={containerStyle}>
      <div className="card">
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
