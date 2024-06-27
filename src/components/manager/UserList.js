import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Table, Row, Col } from "react-bootstrap";
import MyAxios from "../../util/MyAxios";
import UserRow from "./UserRow";
import UserForm from "./UserForm";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const [showUserForm, setShowUserForm] = useState(false);
  const [userFormMode, setUserFormMode] = useState("");
  const [userFormUser, setUserFormUser] = useState({});

  useEffect(() => {
    const fetchManager = async () => {
      console.log("hello");

      await MyAxios.get("users")
        .then((res) => {
          setUserList(res.data.data);
        })
        .catch();
    };

    if (!showUserForm) fetchManager();
  }, [showUserForm]);

  useEffect(() => {
    const fetchManager = async () => {
      await MyAxios.get("warehouses")
        .then((res) => {
          setWarehouseList(res.data.data);
        })
        .catch();
    };

    fetchManager();
  }, []);

  return (
    <div>
      <Alert className="text-center">
        <h2 className="mb-0">User management</h2>
      </Alert>

      <div className="px-3 d-flex  justify-content-between">
        <Button
          variant="success"
          className="d-flex align-items-center mb-3"
          onClick={() => {
            setUserFormMode("add");
            // setUserFormUser = {};
            setShowUserForm(true);
          }}
        >
          <i className="bi bi-plus-square fs-6 me-3"></i>
          Add new Manager
        </Button>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Show more"
          onClick={(e) => {
            setShowMore(e.target.checked);
          }}
        />
      </div>

      <Table striped bordered responsive className="">
        <thead>
          <tr>
            <th>ID</th>
            <th className="d-flex justify-content-center">Avatar</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Warehouse</th>
            {showMore && (
              <>
                <th>{window.innerWidth < 1200 ? "DOB" : "Date of Birth"}</th>
                <th>Phone</th>
                <th>Gender</th>
              </>
            )}

            <th className="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              warehouseList={warehouseList}
              showMore={showMore}
              setUserFormMode={setUserFormMode}
              setUserFormUser={setUserFormUser}
              setShowUserForm={setShowUserForm}
            />
          ))}
        </tbody>
      </Table>

      <UserForm
        show={showUserForm}
        setShow={setShowUserForm}
        mode={userFormMode}
        user={userFormUser}
        warehouseList={warehouseList}
      ></UserForm>
    </div>
  );
}
