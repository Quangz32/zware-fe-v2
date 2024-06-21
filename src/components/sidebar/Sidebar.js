import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  //Handle LOGOUT
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggingUser");
  }

  const loggingUser = JSON.parse(localStorage.getItem("loggingUser"));

  return (
    <aside id="sidebar" className="expand">
      <div className="d-flex logo-container">
        <div className="sidebar-logo">
          <Link to="/home">Warehouse Management</Link>
        </div>
      </div>
      <div className="profile">
        <img src="avt1.png" alt="avatar" />
        <span>{loggingUser.name}</span>
      </div>
      <div className="role">
        <span className="role-box">{loggingUser.role}</span>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link to="/home" className="sidebar-link">
            <i className="bi bi-house"></i>
            <span>Home</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/profile" className="sidebar-link">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/users" className="sidebar-link">
            <i className="bi bi-person-vcard"></i>
            <span>Manager</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/warehouses" className="sidebar-link">
            <i className="bi bi-house-gear"></i>
            <span>Warehouse</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/products" className="sidebar-link">
            <i className="bi bi-boxes"></i>
            <span>Product</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/category" className="sidebar-link">
            <i className="bi bi-box-seam-fill"></i>
            <span>Category</span>
          </Link>
        </li>
        <li className="sidebar-item has-dropdown">
          <Link to="#" className="sidebar-link">
            <i className="bi bi-arrow-left-right"></i>
            <span>Transaction</span>
          </Link>
          <ul className="sidebar-dropdown">
            <li className="sidebar-item">
              <Link to="/inbound" className="sidebar-link">
                <span>Inbound</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/outbound" className="sidebar-link">
                <span>Outbound</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/disposedgoods" className="sidebar-link">
                <span>Disposed goods</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-link" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
