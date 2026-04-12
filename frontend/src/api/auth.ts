import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});
export const registerUser = (data: {
  email: string;
  password: string;
}) => API.post("/auth/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}) => API.post("/auth/login", data);