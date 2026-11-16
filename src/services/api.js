import axios from "axios";
import {
  INITIAL_DEVICES,
  INITIAL_ALERTS,
  INITIAL_AUTOMATION_RULES,
  TELEMETRY_24H_DATA,
} from "../data/mockData";

// Configured Axios client pointing to Express backend APIs
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Dynamic JWT auth token interceptor (reads from storage securely)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("nexus_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Device REST API
export const deviceService = {
  getAll: async () => {
    try {
      const res = await apiClient.get("/devices");
      return res.data;
    } catch (err) {
      console.info("Using local device store fallback:", err.message);
      return [...INITIAL_DEVICES];
    }
  },
  getById: async (id) => {
    try {
      const res = await apiClient.get(`/devices/${id}`);
      return res.data;
    } catch (err) {
      return INITIAL_DEVICES.find((d) => d.id === id);
    }
  },
  create: async (newDevice) => {
    try {
      const res = await apiClient.post("/devices", newDevice);
      return res.data;
    } catch (err) {
      console.warn("API create fallback:", err.message);
      return { ...newDevice, id: `DEV-00${Date.now().toString().slice(-2)}` };
    }
  },
};

// Telemetry REST API
export const telemetryService = {
  getLatestByDevice: async (deviceId) => {
    try {
      const res = await apiClient.get(`/telemetry/${deviceId}`);
      return res.data.history || TELEMETRY_24H_DATA;
    } catch (err) {
      return TELEMETRY_24H_DATA;
    }
  },
  ingest: async (telemetryPoint) => {
    try {
      const res = await apiClient.post("/telemetry/ingest", telemetryPoint);
      return res.data;
    } catch (err) {
      return { success: true, fallback: true };
    }
  },
};

// Rules & Persistent DAG Graph REST API
export const ruleService = {
  getAll: async () => {
    try {
      const res = await apiClient.get("/rules");
      return res.data;
    } catch (err) {
      return [...INITIAL_AUTOMATION_RULES];
    }
  },
  getGraph: async (ruleId = "rule-1") => {
    try {
      const res = await apiClient.get(`/rules/${ruleId}/graph`);
      return res.data.graph;
    } catch (err) {
      return null;
    }
  },
  saveGraph: async ({ ruleId = "rule-1", graph }) => {
    try {
      const res = await apiClient.post("/rules/save-graph", { ruleId, graph });
      return res.data;
    } catch (err) {
      console.warn("Persist graph API fallback:", err.message);
      return { success: true, savedAt: new Date().toISOString(), localOnly: true };
    }
  },
  validateGraph: async (graph) => {
    try {
      const res = await apiClient.post("/rules/validate", graph);
      return res.data;
    } catch (err) {
      return err.response?.data || { valid: false, error: err.message };
    }
  },
  executeDAG: async (graph, input) => {
    try {
      const res = await apiClient.post("/rules/execute", { graph, input });
      return res.data;
    } catch (err) {
      return { success: false, error: err.message };
    }
  },
};

// Alerts REST API
export const alertService = {
  getAll: async () => {
    try {
      const res = await apiClient.get("/alerts");
      return res.data;
    } catch (err) {
      return [...INITIAL_ALERTS];
    }
  },
  markAllRead: async () => {
    try {
      const res = await apiClient.put("/alerts/mark-all-read");
      return res.data;
    } catch (err) {
      return { success: true };
    }
  },
};
