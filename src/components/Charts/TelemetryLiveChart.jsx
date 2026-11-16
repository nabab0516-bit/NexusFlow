import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const TelemetryTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(8, 21, 47, 0.95)",
          backdropFilter: "blur(14px)",
          border: "1px solid #00D9FF",
          borderRadius: 10,
          padding: "10px 14px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 217, 255, 0.3)",
        }}
      >
        <div style={{ fontSize: "0.74rem", color: "#AAB8D0", marginBottom: 4 }}>
          Time: {label}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="status-dot online" style={{ width: 8, height: 8 }} />
          <span style={{ fontSize: "0.85rem", color: "#FFFFFF", fontWeight: 600 }}>
            Reading:
          </span>
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              fontFamily: "var(--font-mono)",
              color: "#00D9FF",
              textShadow: "0 0 12px rgba(0, 217, 255, 0.6)",
            }}
          >
            {payload[0].value} {unit}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const TelemetryLiveChart = ({ data, metricKey = "temperature", unit = "°C", color = "#00D9FF" }) => {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="telemetryGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.5} />
              <stop offset="95%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(30, 58, 110, 0.4)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            stroke="#64748B"
            tick={{ fill: "#AAB8D0", fontSize: 12 }}
            axisLine={{ stroke: "rgba(30, 58, 110, 0.5)" }}
            tickLine={false}
          />

          <YAxis
            stroke="#64748B"
            tick={{ fill: "#AAB8D0", fontSize: 12 }}
            axisLine={{ stroke: "rgba(30, 58, 110, 0.5)" }}
            tickLine={false}
          />

          <Tooltip content={<TelemetryTooltip unit={unit} />} />

          <Area
            type="monotone"
            dataKey={metricKey}
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#telemetryGlow)"
            dot={{ r: 4, fill: color, stroke: "#050B1F", strokeWidth: 2 }}
            activeDot={{ r: 7, fill: "#FFFFFF", stroke: color, strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
