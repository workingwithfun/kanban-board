import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const parseJD = (jd: string) =>
  API.post("/ai/parse", { jd });