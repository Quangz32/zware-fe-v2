import React, { useState, useEffect } from "react";
import defaultAvatar from "./defaultAvatar.jpg";
import axios from "axios";
import MyAxios from "../../util/MyAxios";

//props contains: user, warehouseList
export default function ManagerRow(props) {
  const [avatar, setAvatar] = useState("");

  //Get image data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:2000/api/users/${props.user.id}/avatars`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer", // Yêu cầu phản hồi dưới dạng mảng byte (arraybuffer)
        })
        .then((res) => {
          if (res.status === 200) {
            const base64Image = btoa(
              new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
            );
            setAvatar(`data:image/jpeg;base64, ${base64Image}`);
          }
        })
        .catch((e) => {
          //   console.log(e);
        });
    };

    fetchData();
  }, [props]);

  const [warehouse, setWarehouse] = useState({});
  //Get warehouse this user manage
  useEffect(() => {
    const filtedWarehouseList = props.warehouseList.filter(
      (warehouse) => warehouse.id === props.user.warehouse_id
    );
    if (filtedWarehouseList.length > 0) {
      setWarehouse(filtedWarehouseList[0]);
    }
  }, [props]);

  return (
    <tr>
      <td>{props.user.id}</td>
      <td className="d-flex justify-content-center p-1">
        <img src={avatar || defaultAvatar} className="rounded-circle" height={40} alt=" avt" />
      </td>
      <td>{props.user.email}</td>
      <td>{props.user.name}</td>
      <td>{props.user.role}</td>
      <td>{warehouse.name}</td>
      <td>{props.user.date_of_birth?.slice(0, 10)}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.gender}</td>
      <td>
        <button className="btn btn-warning btn-sm mx-1">
          <i className="bi bi-pencil-square"></i>
        </button>
        <button className="btn btn-danger btn-sm mx-1">
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}
