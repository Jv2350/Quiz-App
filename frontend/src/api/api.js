import axios from "axios";

<<<<<<< HEAD
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

// attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
=======
const API = axios.create({
  baseURL: "http://localhost:2000/api",
>>>>>>> 7ce973d7002e691fca38ed6f11f346a0a40c3d96
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
