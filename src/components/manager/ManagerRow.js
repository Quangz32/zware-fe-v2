import React, { useState, useEffect } from "react";
import defaultAvatar from "./defaultAvatar.jpg";
import axios from "axios";

//props contains: manager
export default function ManagerRow(props) {
  const [avatar, setAvatar] = useState("");
  //Get image data
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:2000/api/users/${props.manager.id}/avatars`, {
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
  return (
    <tr>
      <td>{props.manager.id}</td>
      <td className="d-flex justify-content-center">
        <img
          src={avatar || defaultAvatar}
          className="rounded-circle"
          height={36}
          alt="props.manager avt"
        />
      </td>
      <td>{props.manager.email}</td>
      <td>{props.manager.name}</td>
      <td>{props.manager.role}</td>
      <td>{props.manager.date_of_birth?.slice(0, 10)}</td>
      <td>{props.manager.phone}</td>
      <td>{props.manager.gender}</td>
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
