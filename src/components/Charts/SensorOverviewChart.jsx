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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(8, 21, 47, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 217, 255, 0.4)",
          borderRadius: 10,
          padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 217, 255, 0.2)",
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "#AAB8D0", marginBottom: 6, fontWeight: 600 }}>
          {label}
        </div>
        {payload.map((entry, index) => (
          <div
            key={`tooltip-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              fontSize: "0.82rem",
              marginTop: 3,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: entry.color,
                }}
              />
              <span style={{ color: "#E2EDFF" }}>{entry.name}:</span>
            </div>
            <span
              style={{
                fontWeight: 700,
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
              }}
            >
              {entry.value} {entry.name === "Temperature" ? "°C" : "%"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const SensorOverviewChart = ({ data, height = 220 }) => {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {/* Cyan Gradient for Temperature */}
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.0} />
            </linearGradient>

            {/* Purple Gradient for Humidity */}
            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#773CFF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#773CFF" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(30, 58, 110, 0.35)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            stroke="#64748B"
            tick={{ fill: "#AAB8D0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(30, 58, 110, 0.4)" }}
            tickLine={false}
          />

          <YAxis
            stroke="#64748B"
            tick={{ fill: "#AAB8D0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(30, 58, 110, 0.4)" }}
            tickLine={false}
            domain={[0, 80]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="temperature"
            name="Temperature"
            stroke="#00D9FF"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorTemp)"
            dot={{ r: 3, fill: "#00D9FF", stroke: "#050B1F", strokeWidth: 1.5 }}
            activeDot={{ r: 6, fill: "#00D9FF", stroke: "#FFFFFF", strokeWidth: 2 }}
          />

          <Area
            type="monotone"
            dataKey="humidity"
            name="Humidity"
            stroke="#9D4EDD"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorHumidity)"
            dot={{ r: 3, fill: "#9D4EDD", stroke: "#050B1F", strokeWidth: 1.5 }}
            activeDot={{ r: 6, fill: "#9D4EDD", stroke: "#FFFFFF", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
