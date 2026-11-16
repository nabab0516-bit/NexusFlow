import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  TrendingUp,
  PlusCircle,
  DivideCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calculator,
} from "lucide-react";

const iconMap = {
  TrendingUp,
  PlusCircle,
  DivideCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calculator,
};

const MathNode = ({ id, data, selected }) => {
  const IconComponent = iconMap[data.icon] || Calculator;

  return (
    <div
      style={{
        minWidth: 200,
        background: "rgba(14, 18, 48, 0.92)",
        backdropFilter: "blur(12px)",
        border: selected
          ? "2px solid #773CFF"
          : "1px solid rgba(119, 60, 255, 0.4)",
        borderRadius: 14,
        boxShadow: selected
          ? "0 0 25px rgba(119, 60, 255, 0.45), 0 8px 24px rgba(0, 0, 0, 0.6)"
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
          background: "#773CFF",
          width: 12,
          height: 12,
          top: -6,
          boxShadow: "0 0 10px #773CFF",
        }}
      />

      {/* Node Header */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(119, 60, 255, 0.3) 0%, rgba(165, 120, 255, 0.15) 100%)",
          padding: "8px 12px",
          borderBottom: "1px solid rgba(119, 60, 255, 0.25)",
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
              background: "rgba(119, 60, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#A578FF",
            }}
          >
            <IconComponent size={13} />
          </div>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#A578FF",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Math Operation
          </span>
        </div>

        <span
          className="badge badge-purple"
          style={{ fontSize: "0.68rem", padding: "2px 6px" }}
        >
          {data.operation || "avg"}
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
          {data.name || "Moving Average"}
        </div>

        <div
          style={{
            fontSize: "0.75rem",
            color: "#AAB8D0",
            marginBottom: 8,
          }}
        >
          Window: {data.windowSize || 5} samples
        </div>

        {/* Computation Preview */}
        <div
          style={{
            background: "rgba(5, 11, 31, 0.65)",
            border: "1px solid rgba(119, 60, 255, 0.2)",
            borderRadius: 8,
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "0.72rem", color: "#64748B" }}>Computed Output:</span>
          <span
            style={{
              fontSize: "0.92rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "#A578FF",
              textShadow: "0 0 10px rgba(119, 60, 255, 0.5)",
            }}
          >
            {data.computedValue !== undefined ? data.computedValue : "25.1"}
          </span>
        </div>
      </div>

      {/* Bottom Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        style={{
          background: "#773CFF",
          width: 12,
          height: 12,
          bottom: -6,
          boxShadow: "0 0 10px #773CFF",
        }}
      />
    </div>
  );
};

export default memo(MathNode);
