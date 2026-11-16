import React from "react";
import { ResponsiveContainer, LineChart, Line } from "recharts";

export const Sparkline = ({ data = [20, 22, 23, 24, 25, 24, 26], color = "#00D9FF", width = 90, height = 36 }) => {
  const chartData = data.map((val, idx) => ({ index: idx, value: val }));

  return (
    <div style={{ width, height, overflow: "hidden" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 4, bottom: 4, left: 4, right: 4 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
