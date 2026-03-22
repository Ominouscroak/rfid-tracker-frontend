import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getScans = () => api.get("/scans");
export const getInstruments = () => api.get("/instruments");
export const getAlerts = () => api.get("/alerts");

// 🟢 NEW: system status endpoint
export const getStatus = () => api.get("/status");

export default api;