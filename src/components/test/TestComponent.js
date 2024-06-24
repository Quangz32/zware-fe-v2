import React, { useEffect, useState } from "react";
import MyAxios from "../../util/MyAxios";
import axios from "axios";

export default function TestComponent() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleImageUpload = async () => {
    try {
      const imageFile = document.getElementById("image-input").files[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(`http://localhost:2000/api/products/1/image`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input id="image-input" type="file" />
      <button onClick={handleImageUpload}>Gửi ảnh</button>
      <p>{responseMessage}</p>
    </div>
  );
}
