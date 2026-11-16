import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

class TelemetrySocketClient {
  constructor() {
    this.listeners = new Map();
    this.socket = null;
    this.isConnected = false;
    this.fallbackInterval = null;

    this.initSocket();
  }

  initSocket() {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        timeout: 5000,
      });

      this.socket.on("connect", () => {
        console.log(`[Socket.IO Client] Connected to backend gateway at ${SOCKET_URL} (ID: ${this.socket.id})`);
        this.isConnected = true;
        this.stopFallbackTicker();
      });

      this.socket.on("disconnect", (reason) => {
        console.warn(`[Socket.IO Client] Disconnected: ${reason}. Activating fallback ticker.`);
        this.isConnected = false;
        this.startFallbackTicker();
      });

      this.socket.on("connect_error", (err) => {
        // Backend not yet running or network delay
        this.isConnected = false;
        this.startFallbackTicker();
      });

      // Relay server events to local listeners
      this.socket.on("telemetry:tick", (data) => {
        this.emitLocal("telemetry:tick", data);
      });

      this.socket.on("rule:triggered", (data) => {
        this.emitLocal("rule:triggered", data);
      });

      this.socket.on("alert:new", (data) => {
        this.emitLocal("alert:new", data);
      });
    } catch (err) {
      console.warn("[Socket.IO Client] Init fallback:", err.message);
      this.startFallbackTicker();
    }
  }

  // Subscribe to real-time events
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  // Unsubscribe
  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  // Dispatch event to local subscribers
  emitLocal(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error("Socket listener error:", err);
        }
      });
    }
  }

  // Emit event to server
  emitServer(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      // Offline fallback handling
      this.emitLocal(event, data);
    }
  }

  simulateTrigger(payload) {
    this.emitServer("simulate:overheat", payload);
  }

  // Fallback ticker if server is not reachable
  startFallbackTicker() {
    if (this.fallbackInterval) return;

    this.fallbackInterval = setInterval(() => {
      const tempJitter = (Math.random() * 0.4 - 0.2).toFixed(1);
      const payload = {
        timestamp: new Date().toISOString(),
        temperature: +(24.2 + parseFloat(tempJitter)).toFixed(1),
        humidity: 68 + Math.floor(Math.random() * 3 - 1),
        airQuality: 42 + Math.floor(Math.random() * 3 - 1),
        motion: Math.random() > 0.85 ? 1 : 0,
      };

      this.emitLocal("telemetry:tick", payload);
    }, 2500);
  }

  stopFallbackTicker() {
    if (this.fallbackInterval) {
      clearInterval(this.fallbackInterval);
      this.fallbackInterval = null;
    }
  }
}

export const telemetrySocket = new TelemetrySocketClient();
