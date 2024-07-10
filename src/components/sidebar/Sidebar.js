import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import MyAxios from "../../util/MyAxios";
import defaultProfileImage from "./defaultProfileImage.jpg"; // Make sure to have a default profile image
import ChangePassword from "./ChangePassword";
import { Button } from "react-bootstrap";

const Sidebar = () => {
  const [avatarUrl, setAvatarUrl] = useState(defaultProfileImage);
  const [username, setUsername] = useState("");

  const [showChangePassword, setShowChangePassword] = useState(false);

  const fetchUsername = () => {
    MyAxios.get("/users/me")
      .then((response) => {
        const nameData = response.data.data;
        setUsername(nameData.name);
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
        setUsername("Error");
      });
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  // Handle LOGOUT
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggingUser");
  }

  const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

  useEffect(() => {
    if (loggingUser && loggingUser.id) {
      fetchAvatar();
    }
  }, [loggingUser?.id]);

  const fetchAvatar = () => {
    MyAxios.get(`/users/${loggingUser.id}/avatars`, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const base64Image = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        setAvatarUrl(`data:image/jpeg;base64,${base64Image}`);
      })
      .catch((error) => {
        console.error("Error fetching avatar:", error);
      });
  };

  return (
    <>
      <aside id="sidebar" className="expand">
        <div className="d-flex logo-container">
          <div className="sidebar-logo">
            <Link to="/home">Warehouse Management</Link>
          </div>
        </div>
        <div className="profile">
          <img src={avatarUrl} alt="avatar" />
          <span>{username}</span>
        </div>
        <div className="role">
          <span className="role-box">{loggingUser?.role}</span>
        </div>
        <ul className="sidebar-nav">
          {loggingUser?.role === "manager" && (
            <li className="sidebar-item">
              <Link to="/home" className="sidebar-link">
                <i className="bi bi-house"></i>
                <span>Home</span>
              </Link>
            </li>
          )}
          {loggingUser?.role === "admin" && (
            <li className="sidebar-item">
              <Link to="/adhome" className="sidebar-link">
                <i className="bi bi-house"></i>
                <span>Home</span>
              </Link>
            </li>
          )}
          <li className="sidebar-item">
            <Link to="/profile" className="sidebar-link">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </Link>
          </li>
          {loggingUser?.role === "admin" && (
            <li className="sidebar-item">
              <Link to="/managers" className="sidebar-link">
                <i className="bi bi-person-vcard"></i>
                <span>Manager</span>
              </Link>
            </li>
          )}

          {loggingUser?.role === "admin" && (
            <li className="sidebar-item">
              <Link to="/warehouses" className="sidebar-link">
                <i className="bi bi-house-gear"></i>
                <span>Warehouse</span>
              </Link>
            </li>
          )}
          {loggingUser?.role === "admin" && (
            <li className="sidebar-item">
              <Link to="/warehouseitems" className="sidebar-link">
                <i className="bi bi-house-check"></i>
                <span>Warehouse Item</span>
              </Link>
            </li>
          )}

          {loggingUser?.role === "manager" && (
            <li className="sidebar-item">
              <Link to="/managerwarehouseitems" className="sidebar-link">
                <i className="bi bi-house-check"></i>
                <span>Warehouse Item</span>
              </Link>
            </li>
          )}

          <li className="sidebar-item">
            <Link to="/products" className="sidebar-link">
              <i className="bi bi-boxes"></i>
              <span>Product</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/categories" className="sidebar-link">
              <i className="bi bi-box-seam-fill"></i>
              <span>Category</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/transactions" className="sidebar-link">
              <i className="bi bi-arrow-left-right"></i>
              <span>Transaction</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/history" className="sidebar-link">
              <i className="bi bi-clipboard-data"></i>
              <span>Report</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link
            className="sidebar-link ms-2 p-2"
            onClick={() => {
              setShowChangePassword(true);
            }}
          >
            <i className="bi bi-shield-exclamation"></i>
            <span>Change password</span>
          </Link>
          <Link to="/login" className="sidebar-link ms-2 p-2" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
      <ChangePassword show={showChangePassword} setShow={setShowChangePassword}></ChangePassword>
    </>
  );
};

export default Sidebar;
