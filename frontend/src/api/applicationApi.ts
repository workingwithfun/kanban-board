import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getApplications = async () => {
  const res = await API.get("/applications");
  return res.data;
};

export const createApplication = async (data: any) => {
  const res = await API.post("/applications", data);
  return res.data;
};