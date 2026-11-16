import React, { useState } from "react";
import {
  Plus,
  Search,
  Thermometer,
  Droplets,
  Flame,
  Activity,
  Wind,
  Cpu,
  Wifi,
  WifiOff,
  Filter,
  Check,
  X,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Sparkline } from "../../components/Charts/Sparkline";

export const Devices = ({ devices, setDevices, onSelectDeviceForTelemetry }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "Temperature",
    location: "Zone A",
    unit: "°C",
    value: 25,
  });

  // Filtered devices
  const filteredDevices = devices.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(search.toLowerCase()) ||
      dev.id.toLowerCase().includes(search.toLowerCase()) ||
      dev.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || dev.status === statusFilter;
    const matchesType =
      typeFilter === "all" || dev.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getDeviceIcon = (type) => {
    switch (type) {
      case "Temperature":
        return <Thermometer size={18} color="#FF4757" />;
      case "Humidity":
        return <Droplets size={18} color="#00D9FF" />;
      case "Smoke":
        return <Flame size={18} color="#FFB020" />;
      case "Motion":
        return <Activity size={18} color="#00D68F" />;
      case "Air Quality":
        return <Wind size={18} color="#773CFF" />;
      default:
        return <Cpu size={18} color="#00D9FF" />;
    }
  };

  const handleAddDeviceSubmit = (e) => {
    e.preventDefault();
    if (!newDevice.name) return;

    const created = {
      id: `DEV-0${devices.length + 1}`,
      name: newDevice.name,
      type: newDevice.type,
      location: newDevice.location,
      value: newDevice.value,
      unit: newDevice.type === "Temperature" ? "°C" : newDevice.type === "Humidity" ? "%" : "AQI",
      status: "online",
      ipAddress: `192.168.1.${110 + devices.length}`,
      battery: 100,
      rssi: -45,
      sparkline: [20, 22, 23, 24, 25, 24, 25],
      lastUpdated: "Just now",
    };

    setDevices([created, ...devices]);
    setIsAddModalOpen(false);
    setNewDevice({
      name: "",
      type: "Temperature",
      location: "Zone A",
      unit: "°C",
      value: 25,
    });
  };

  // Quick toggle value simulator (e.g. inject 38°C overheat)
  const handleSimulateOverheat = (id) => {
    setDevices(
      devices.map((d) =>
        d.id === id
          ? {
              ...d,
              value: d.value > 35 ? 24.2 : 38.4,
              lastUpdated: "Just now",
              sparkline: [...d.sparkline.slice(1), d.value > 35 ? 24.2 : 38.4],
            }
          : d
      )
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Top Header matching Reference Image Card 4 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Devices
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#64748B" }}>
            Total {devices.length} IoT Sensors & Actuators connected
          </p>
        </div>

        {/* Glowing "+ Add Device" Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
          style={{ padding: "8px 18px", fontSize: "0.88rem" }}
        >
          <Plus size={16} />
          <span>+ Add Device</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="glass-card"
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        {/* Search devices input matching reference image */}
        <div style={{ position: "relative", minWidth: 260, flex: 1 }}>
          <Search
            size={16}
            color="#64748B"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search devices..."
            className="input-field"
            style={{ paddingLeft: 40, height: 38 }}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "online", "offline"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                background: statusFilter === st ? "rgba(0, 217, 255, 0.2)" : "rgba(6, 15, 37, 0.6)",
                color: statusFilter === st ? "#00D9FF" : "#AAB8D0",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                border: statusFilter === st ? "1px solid #00D9FF" : "1px solid rgba(30, 58, 110, 0.5)",
              }}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Sensor Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            background: "rgba(6, 15, 37, 0.8)",
            border: "1px solid rgba(30, 58, 110, 0.7)",
            color: "#FFFFFF",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: "0.8rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">All Sensor Types</option>
          <option value="Temperature">Temperature</option>
          <option value="Humidity">Humidity</option>
          <option value="Smoke">Smoke</option>
          <option value="Motion">Motion</option>
          <option value="Air Quality">Air Quality</option>
          <option value="Actuator">Actuators / Relays</option>
        </select>
      </div>

      {/* Device List Cards matching Reference Image Card 4 layout */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredDevices.map((dev) => {
          const isOnline = dev.status === "online";

          return (
            <div
              key={dev.id}
              className="glass-card"
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                border: dev.value > 35 && dev.type === "Temperature"
                  ? "1px solid #FF4757"
                  : undefined,
                boxShadow: dev.value > 35 && dev.type === "Temperature"
                  ? "0 0 20px rgba(255, 71, 87, 0.25)"
                  : undefined,
              }}
            >
              {/* Left: Sensor Icon & Details */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 260 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: isOnline ? "rgba(8, 30, 58, 0.8)" : "rgba(35, 15, 20, 0.8)",
                    border: `1px solid ${isOnline ? "rgba(0, 217, 255, 0.3)" : "rgba(255, 71, 87, 0.3)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isOnline ? "0 0 12px rgba(0, 217, 255, 0.2)" : "none",
                  }}
                >
                  {getDeviceIcon(dev.type)}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h4 style={{ fontSize: "0.96rem", fontWeight: 700, color: "#FFFFFF" }}>
                      {dev.name}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontFamily: "var(--font-mono)",
                        color: "#64748B",
                        padding: "1px 6px",
                        background: "rgba(5, 11, 31, 0.6)",
                        borderRadius: 4,
                      }}
                    >
                      {dev.id}
                    </span>
                  </div>

                  {/* Status & Latest Value line matching reference image */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.78rem",
                      color: "#AAB8D0",
                      marginTop: 4,
                    }}
                  >
                    <span className={`status-dot ${dev.status}`} style={{ width: 6, height: 6 }} />
                    <span style={{ textTransform: "capitalize", fontWeight: 600, color: isOnline ? "#00D68F" : "#FF4757" }}>
                      {dev.status}
                    </span>
                    <span>•</span>
                    <span style={{ color: "#E2EDFF" }}>
                      {isOnline ? `${dev.value} ${dev.unit}` : "No Signal"}
                    </span>
                    <span>•</span>
                    <span style={{ color: "#64748B", fontSize: "0.72rem" }}>{dev.location}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Sparkline Mini Graph */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {isOnline && dev.sparkline && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Sparkline
                      data={dev.sparkline}
                      color={dev.value > 35 && dev.type === "Temperature" ? "#FF4757" : "#00D9FF"}
                      width={120}
                      height={38}
                    />
                    <span style={{ fontSize: "0.68rem", color: "#64748B" }}>live trend</span>
                  </div>
                )}
              </div>

              {/* Right Actions: Simulate change & View in Telemetry */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {dev.type === "Temperature" && (
                  <button
                    onClick={() => handleSimulateOverheat(dev.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      background: dev.value > 35 ? "rgba(255, 71, 87, 0.2)" : "rgba(8, 123, 255, 0.15)",
                      border: `1px solid ${dev.value > 35 ? "#FF4757" : "rgba(8, 123, 255, 0.4)"}`,
                      color: dev.value > 35 ? "#FF4757" : "#00D9FF",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    title="Toggle temperature to test Rule Engine threshold trigger"
                  >
                    {dev.value > 35 ? "Reset (24°C)" : "Simulate Overheat (>35°C)"}
                  </button>
                )}

                <button
                  onClick={() => onSelectDeviceForTelemetry && onSelectDeviceForTelemetry(dev)}
                  className="btn-secondary"
                  style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                >
                  <span>Telemetry</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Device Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 20,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: 480,
              padding: 28,
              background: "rgba(8, 21, 47, 0.98)",
              border: "1px solid #00D9FF",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 217, 255, 0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Cpu size={20} color="#00D9FF" />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF" }}>
                  Register New IoT Device
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddDeviceSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                  Device Name
                </label>
                <input
                  type="text"
                  required
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  placeholder="e.g. Boiler Pressure Gauge #013"
                  className="input-field"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                    Sensor Type
                  </label>
                  <select
                    value={newDevice.type}
                    onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="Temperature">Temperature</option>
                    <option value="Humidity">Humidity</option>
                    <option value="Smoke">Smoke</option>
                    <option value="Motion">Motion</option>
                    <option value="Air Quality">Air Quality</option>
                    <option value="Actuator">Actuator / Relay</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                    Deployment Zone
                  </label>
                  <input
                    type="text"
                    value={newDevice.location}
                    onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                    placeholder="e.g. Server Room 101"
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Register Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
