import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Smartphone,
  Globe,
  Bell,
  Cpu,
  Send,
  Zap,
  CheckCircle2,
} from "lucide-react";

const iconMap = {
  Smartphone,
  Globe,
  Bell,
  Cpu,
  Send,
  Zap,
};

const ActionNode = ({ id, data, selected }) => {
  const IconComponent = iconMap[data.icon] || Send;

  return (
    <div
      style={{
        minWidth: 200,
        background: "rgba(10, 32, 28, 0.92)",
        backdropFilter: "blur(12px)",
        border: selected
          ? "2px solid #00D68F"
          : "1px solid rgba(0, 214, 143, 0.45)",
        borderRadius: 14,
        boxShadow: selected
          ? "0 0 25px rgba(0, 214, 143, 0.45), 0 8px 24px rgba(0, 0, 0, 0.6)"
          : "0 4px 20px rgba(0, 0, 0, 0.45)",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      {/* Top Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        style={{
          background: "#00D68F",
          width: 12,
          height: 12,
          top: -6,
          boxShadow: "0 0 10px #00D68F",
        }}
      />

      {/* Node Header */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(0, 214, 143, 0.3) 0%, rgba(0, 217, 255, 0.15) 100%)",
          padding: "8px 12px",
          borderBottom: "1px solid rgba(0, 214, 143, 0.25)",
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
              background: "rgba(0, 214, 143, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00D68F",
            }}
          >
            <IconComponent size={13} />
          </div>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#00D68F",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Action Trigger
          </span>
        </div>

        <span
          style={{
            fontSize: "0.68rem",
            padding: "2px 6px",
            borderRadius: 9999,
            fontWeight: 700,
            background: data.triggered ? "rgba(0, 214, 143, 0.25)" : "rgba(255, 176, 32, 0.2)",
            color: data.triggered ? "#00D68F" : "#FFB020",
            border: `1px solid ${data.triggered ? "rgba(0, 214, 143, 0.4)" : "rgba(255, 176, 32, 0.4)"}`,
          }}
        >
          {data.triggered ? "DISPATCHED" : "ARMED"}
        </span>
      </div>

      {/* Node Body matching reference image */}
      <div style={{ padding: "10px 14px" }}>
        <div
          style={{
            fontSize: "0.92rem",
            fontWeight: 600,
            color: "#FFFFFF",
            marginBottom: 4,
          }}
        >
          {data.name || "Send Alert (SMS / Email)"}
        </div>

        <div
          style={{
            fontSize: "0.74rem",
            color: "#AAB8D0",
            marginBottom: 6,
            wordBreak: "break-all",
          }}
        >
          {data.recipient || data.url || data.targetDevice || "+91 98765 43210"}
        </div>

        {data.message && (
          <div
            style={{
              background: "rgba(5, 11, 31, 0.65)",
              border: "1px solid rgba(0, 214, 143, 0.2)",
              borderRadius: 8,
              padding: "6px 8px",
              fontSize: "0.72rem",
              color: "#AAB8D0",
              fontStyle: "italic",
            }}
          >
            "{data.message}"
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ActionNode);
