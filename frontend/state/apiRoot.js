import axios from "axios";
import { url } from "./apiUrl";

const api = axios.create({
  baseURL: url.baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export {api}