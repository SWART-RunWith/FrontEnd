import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("authToken");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
