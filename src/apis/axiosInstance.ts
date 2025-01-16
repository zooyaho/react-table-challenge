import { API_BASE_URL } from "@/constants/apiPaths";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    timeout: 5000,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
