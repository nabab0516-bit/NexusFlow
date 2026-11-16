import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Filter, Sliders, CheckSquare, AlertTriangle } from "lucide-react";

const iconMap = {
  Filter,
  Sliders,
  CheckSquare,
  AlertTriangle,
};

const FilterNode = ({ id, data, selected }) => {
  const IconComponent = iconMap[data.icon] || Filter;
  const isPassing = data.evaluation !== false;

  return (
    <div
      style={{
        minWidth: 190,
        background: "rgba(22, 14, 46, 0.92)",
        backdropFilter: "blur(12px)",
        border: selected
          ? "2px solid #9D4EDD"
          : "1px solid rgba(157, 78, 221, 0.45)",
        borderRadius: 14,
        boxShadow: selected
          ? "0 0 25px rgba(157, 78, 221, 0.45), 0 8px 24px rgba(0, 0, 0, 0.6)"
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
          background: "#9D4EDD",
          width: 12,
          height: 12,
          top: -6,
          boxShadow: "0 0 10px #9D4EDD",
        }}
      />

      {/* Node Header */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(157, 78, 221, 0.35) 0%, rgba(119, 60, 255, 0.15) 100%)",
          padding: "8px 12px",
          borderBottom: "1px solid rgba(157, 78, 221, 0.25)",
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
              background: "rgba(157, 78, 221, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C77DFF",
            }}
          >
            <IconComponent size={13} />
          </div>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#C77DFF",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Filter / Logic
          </span>
        </div>

        <span
          style={{
            fontSize: "0.68rem",
            padding: "2px 6px",
            borderRadius: 9999,
            fontWeight: 700,
            background: isPassing ? "rgba(0, 214, 143, 0.2)" : "rgba(255, 71, 87, 0.2)",
            color: isPassing ? "#00D68F" : "#FF4757",
            border: `1px solid ${isPassing ? "rgba(0, 214, 143, 0.4)" : "rgba(255, 71, 87, 0.4)"}`,
          }}
        >
          {isPassing ? "TRUE" : "FALSE"}
        </span>
      </div>

      {/* Node Body with prominent condition badge like reference image */}
      <div style={{ padding: "12px 14px", textAlign: "center" }}>
        <div
          style={{
            background: "rgba(119, 60, 255, 0.18)",
            border: "1px solid rgba(157, 78, 221, 0.5)",
            borderRadius: 10,
            padding: "8px 12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            minWidth: "120px",
          }}
        >
          <span
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "#FFFFFF",
              letterSpacing: "0.02em",
            }}
          >
            {data.label || `${data.operator || ">"} ${data.thresholdValue || 35}${data.unit || "°C"}`}
          </span>
        </div>

        <div
          style={{
            fontSize: "0.72rem",
            color: "#AAB8D0",
            marginTop: 6,
          }}
        >
          {data.name || "Threshold Condition"}
        </div>
      </div>

      {/* Bottom Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{
          background: "#9D4EDD",
          width: 12,
          height: 12,
          bottom: -6,
          boxShadow: "0 0 10px #9D4EDD",
        }}
      />
    </div>
  );
};

export default memo(FilterNode);
