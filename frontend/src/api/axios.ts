// frontend/src/api/axios.ts
import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

export default API;