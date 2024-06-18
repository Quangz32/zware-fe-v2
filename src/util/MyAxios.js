import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tạo một hàm để cập nhật header Authorization
function updateAuthorizationHeader(config) {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
}

// Intercept request để cập nhật lại header trước mỗi lần gửi request
instance.interceptors.request.use(
  (config) => {
    return updateAuthorizationHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
