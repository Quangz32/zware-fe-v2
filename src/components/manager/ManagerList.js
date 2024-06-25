import React, { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import ManagerRow from "./ManagerRow";
import axios from "axios";

export default function ManagerList() {
  const [managerList, setManagerList] = useState([]);

  useEffect(() => {
    const fetchManager = async () => {
      await MyAxios.get("users").then((res) => {
        setManagerList(res.data.data);
      });
    };

    fetchManager();
  }, []);

  return (
    <div>
      <Alert className="text-center">
        <h2 className="mb-0">User management</h2>
      </Alert>

      <Button variant="success" className="d-flex align-items-center mb-3">
        <i className="bi bi-plus-square fs-6 me-3"></i>
        Add new Manager
      </Button>
      <Table striped bordered responsive className="">
        <thead>
          <tr>
            <th>ID</th>
            <th className="d-flex justify-content-center">Avatar</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>{window.innerWidth < 1200 ? "DOB" : "Date of Birth"}</th>
            <th>Phone</th>
            <th>Gender</th>
            <th className="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managerList?.map((manager) => (
            <ManagerRow key={manager.id} manager={manager} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
