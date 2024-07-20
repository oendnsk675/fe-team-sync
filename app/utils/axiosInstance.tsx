import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/", // Ganti dengan baseURL kamu
});

export const axiosWithAuth = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
