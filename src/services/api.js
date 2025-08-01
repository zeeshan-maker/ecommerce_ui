// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-api-z44v.onrender.com/api/v1",
});

// Add request interceptor to include token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // or from Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Auto refresh token on 401


export default API;
