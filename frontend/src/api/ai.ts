import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const parseJD = (jd: string) =>
  API.post("/ai/parse", { jd });