import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getScans = () => api.get("/scans");

export const getInstruments = () => api.get("/instruments");

export const getAlerts = () => api.get("/alerts");

export default api;