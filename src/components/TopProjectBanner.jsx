import React, { useState } from "react";
import { Layers, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { NexusLogo } from "./NexusLogo";

export const TopProjectBanner = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #050B1F 0%, #08152F 50%, #050B1F 100%)",
        borderBottom: "1px solid rgba(0, 217, 255, 0.25)",
        padding: collapsed ? "6px 24px" : "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <NexusLogo size={collapsed ? 24 : 32} />

        {!collapsed && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Visual IoT Telemetry & Rule Engine
            </span>
            <span style={{ fontSize: "0.75rem", color: "#AAB8D0" }}>
              Project UI Design Chart – As per Infotact Solutions Guidelines
            </span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {!collapsed && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 14px",
              borderRadius: 20,
              background: "rgba(14, 31, 71, 0.7)",
              border: "1px solid rgba(0, 217, 255, 0.4)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#00D9FF",
              boxShadow: "0 0 12px rgba(0, 217, 255, 0.2)",
            }}
          >
            <Sparkles size={14} color="#00D9FF" />
            <span>MERN Stack • React Flow • MongoDB</span>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none",
            border: "none",
            color: "#64748B",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
          title={collapsed ? "Expand project banner" : "Collapse banner"}
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>
    </div>
  );
};
