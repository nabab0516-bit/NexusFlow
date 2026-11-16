import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Thermometer,
  Droplets,
  Wind,
  Activity,
  Cpu,
  Radio,
  Trash2,
  Settings,
} from "lucide-react";

const iconMap = {
  Thermometer: Thermometer,
  Droplets: Droplets,
  Wind: Wind,
  Activity: Activity,
  Cpu: Cpu,
  Radio: Radio,
};

const DataSourceNode = ({ id, data, selected }) => {
  const IconComponent = iconMap[data.icon] || Thermometer;

  return (
    <div
      style={{
        minWidth: 200,
        background: "rgba(8, 21, 47, 0.92)",
        backdropFilter: "blur(12px)",
        border: selected
          ? "2px solid #00D9FF"
          : "1px solid rgba(0, 217, 255, 0.4)",
        borderRadius: 14,
        boxShadow: selected
          ? "0 0 25px rgba(0, 217, 255, 0.4), 0 8px 24px rgba(0, 0, 0, 0.6)"
          : "0 4px 20px rgba(0, 0, 0, 0.45)",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      {/* Node Header */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(8, 123, 255, 0.3) 0%, rgba(0, 217, 255, 0.15) 100%)",
          padding: "8px 12px",
          borderBottom: "1px solid rgba(0, 217, 255, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "rgba(0, 217, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00D9FF",
            }}
          >
            <IconComponent size={13} />
          </div>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#00D9FF",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Data Source
          </span>
        </div>

        <span
          className="badge badge-online"
          style={{ fontSize: "0.68rem", padding: "2px 6px" }}
        >
          {data.status || "online"}
        </span>
      </div>

      {/* Node Body */}
      <div style={{ padding: "10px 14px" }}>
        <div
          style={{
            fontSize: "0.92rem",
            fontWeight: 600,
            color: "#FFFFFF",
            marginBottom: 4,
          }}
        >
          {data.name || data.sensorType || "Sensor Node"}
        </div>

        <div
          style={{
            fontSize: "0.75rem",
            color: "#AAB8D0",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Radio size={11} color="#00D9FF" />
          <span>{data.deviceName || data.deviceId || "DEV-001"}</span>
        </div>

        {/* Live Value Display */}
        <div
          style={{
            background: "rgba(5, 11, 31, 0.65)",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            borderRadius: 8,
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "0.72rem", color: "#64748B" }}>Reading:</span>
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "#00D9FF",
              textShadow: "0 0 10px rgba(0, 217, 255, 0.5)",
            }}
          >
            {data.currentValue !== undefined ? data.currentValue : 24.2} {data.unit || "°C"}
          </span>
        </div>
      </div>

      {/* Bottom Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{
          background: "#00D9FF",
          width: 12,
          height: 12,
          bottom: -6,
          boxShadow: "0 0 10px #00D9FF",
        }}
      />
    </div>
  );
};

export default memo(DataSourceNode);
