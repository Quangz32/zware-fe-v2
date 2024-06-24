import React, { useEffect, useState } from "react";
import MyAxios from "../util/MyAxios";
import axios from "axios";

export default function TestComponent() {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/products/1/image",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE3MTkyMDcxMzE0NjF9.LN58ojWO1Kj-4A3fB0N1jXgJ0CyQW75CggiPrnpKvUg=",
            },
            responseType: "arraybuffer", // Yêu cầu phản hồi dưới dạng mảng byte (arraybuffer)
          }
        );

        console.log(response);

        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        setImageData(`data:image/jpeg;base64, ${base64Image}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div>{imageData && <img src={imageData} alt="API Image" />}</div>;
}
