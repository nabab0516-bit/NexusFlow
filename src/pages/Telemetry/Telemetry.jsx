import React, { useState, useEffect } from "react";
import {
  Thermometer,
  Droplets,
  Wind,
  Activity,
  RefreshCw,
  Play,
  Pause,
  Download,
  Clock,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { TelemetryLiveChart } from "../../components/Charts/TelemetryLiveChart";
import { telemetrySocket } from "../../services/socket";

export const Telemetry = ({ selectedDevice }) => {
  const [activeTab, setActiveTab] = useState("temperature"); // temperature | humidity | airQuality
  const [timeRange, setTimeRange] = useState("1h");
  const [isStreaming, setIsStreaming] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState("10 Nov 2026, 04:45 PM");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live series state
  const [telemetrySeries, setTelemetrySeries] = useState([
    { time: "1h", temperature: 21.4, humidity: 62, airQuality: 35 },
    { time: "2h", temperature: 22.8, humidity: 64, airQuality: 38 },
    { time: "3h", temperature: 23.5, humidity: 66, airQuality: 40 },
    { time: "4h", temperature: 24.2, humidity: 68, airQuality: 42 },
  ]);

  const [currentValue, setCurrentValue] = useState(24.2);

  // Listen to socket tick
  useEffect(() => {
    const unsubscribe = telemetrySocket.on("telemetry:tick", (tick) => {
      if (!isStreaming) return;

      const dateStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLastRefreshed(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + ", " + dateStr);

      if (activeTab === "temperature") {
        setCurrentValue(tick.temperature);
      } else if (activeTab === "humidity") {
        setCurrentValue(tick.humidity);
      } else {
        setCurrentValue(tick.airQuality);
      }

      setTelemetrySeries((prev) => {
        const next = [...prev];
        if (next.length >= 8) next.shift();
        next.push({
          time: dateStr,
          temperature: tick.temperature,
          humidity: tick.humidity,
          airQuality: tick.airQuality,
        });
        return next;
      });
    });

    return () => unsubscribe();
  }, [isStreaming, activeTab]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const dateStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLastRefreshed(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) + ", " + dateStr);
    }, 600);
  };

  const getMetricConfig = () => {
    switch (activeTab) {
      case "humidity":
        return {
          label: "Live Humidity",
          unit: "%",
          icon: Droplets,
          color: "#00D9FF",
          normalRange: "40% - 70%",
          isNormal: currentValue >= 30 && currentValue <= 70,
        };
      case "airQuality":
        return {
          label: "Live Air Quality",
          unit: "AQI",
          icon: Wind,
          color: "#773CFF",
          normalRange: "0 - 50 AQI (Good)",
          isNormal: currentValue <= 50,
        };
      case "temperature":
      default:
        return {
          label: "Live Temperature",
          unit: "°C",
          icon: Thermometer,
          color: currentValue > 35 ? "#FF4757" : "#00D9FF",
          normalRange: "18°C - 32°C",
          isNormal: currentValue <= 35,
        };
    }
  };

  const metric = getMetricConfig();
  const IconComponent = metric.icon;

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Timestamp,Temperature(°C),Humidity(%),AirQuality(AQI)"].concat(
        telemetrySeries.map((row) => `${row.time},${row.temperature},${row.humidity},${row.airQuality}`)
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexusflow_telemetry_${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Top Header & Metric Tabs matching Reference Image Card 5 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        {/* Metric Selector Tabs */}
        <div
          style={{
            display: "inline-flex",
            background: "rgba(6, 15, 37, 0.8)",
            padding: 4,
            borderRadius: 12,
            border: "1px solid rgba(30, 58, 110, 0.6)",
          }}
        >
          {[
            { id: "temperature", label: "Temperature", icon: Thermometer },
            { id: "humidity", label: "Humidity", icon: Droplets },
            { id: "airQuality", label: "Air Quality", icon: Wind },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "temperature") setCurrentValue(24.2);
                  if (tab.id === "humidity") setCurrentValue(68);
                  if (tab.id === "airQuality") setCurrentValue(42);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 18px",
                  borderRadius: 10,
                  border: "none",
                  background: isActive
                    ? "linear-gradient(135deg, #087BFF 0%, #773CFF 100%)"
                    : "transparent",
                  color: isActive ? "#FFFFFF" : "#AAB8D0",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 4px 15px rgba(8, 123, 255, 0.35)" : "none",
                }}
              >
                <TabIcon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Live Stream Play/Pause, Export CSV */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="btn-secondary"
            style={{ padding: "7px 14px", fontSize: "0.8rem", gap: 6 }}
          >
            {isStreaming ? <Pause size={14} color="#00D68F" /> : <Play size={14} color="#00D9FF" />}
            <span>{isStreaming ? "Live Streaming" : "Paused"}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="btn-secondary"
            style={{ padding: "7px 14px", fontSize: "0.8rem", gap: 6 }}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Telemetry Visual Card matching Reference Image Card 5 */}
      <div className="glass-card" style={{ padding: "26px" }}>
        {/* Top Big KPI Row matching reference image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 20,
            paddingBottom: 20,
            borderBottom: "1px solid rgba(30, 58, 110, 0.4)",
          }}
        >
          {/* Big Sensor Reading & Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 18,
                background: metric.isNormal
                  ? "linear-gradient(135deg, rgba(8, 123, 255, 0.25) 0%, rgba(0, 217, 255, 0.15) 100%)"
                  : "linear-gradient(135deg, rgba(255, 71, 87, 0.3) 0%, rgba(119, 60, 255, 0.15) 100%)",
                border: `1px solid ${metric.isNormal ? "#00D9FF" : "#FF4757"}`,
                boxShadow: metric.isNormal
                  ? "0 0 25px rgba(0, 217, 255, 0.3)"
                  : "0 0 25px rgba(255, 71, 87, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconComponent size={34} color={metric.color} />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span
                  style={{
                    fontSize: "3rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    color: "#FFFFFF",
                    lineHeight: 1,
                    textShadow: `0 0 20px ${metric.isNormal ? "rgba(0, 217, 255, 0.5)" : "rgba(255, 71, 87, 0.5)"}`,
                  }}
                >
                  {currentValue}
                </span>
                <span style={{ fontSize: "1.4rem", color: "#00D9FF", fontWeight: 700 }}>
                  {metric.unit}
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "#AAB8D0", marginTop: 4 }}>
                {metric.label} • Target Range: {metric.normalRange}
              </div>
            </div>
          </div>

          {/* Status Badge & Time Range Selector */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            {/* Status Pill matching reference image */}
            <span
              className={metric.isNormal ? "badge badge-online" : "badge badge-offline"}
              style={{
                fontSize: "0.88rem",
                padding: "6px 16px",
                borderRadius: 20,
              }}
            >
              {metric.isNormal ? "Normal" : "Threshold Exceeded"}
            </span>

            {/* Time Filter Pills */}
            <div style={{ display: "flex", gap: 6 }}>
              {["1h", "6h", "24h", "7d", "30d"].map((rng) => (
                <button
                  key={rng}
                  onClick={() => setTimeRange(rng)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    border: "none",
                    background: timeRange === rng ? "rgba(0, 217, 255, 0.25)" : "rgba(6, 15, 37, 0.6)",
                    color: timeRange === rng ? "#00D9FF" : "#64748B",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: timeRange === rng ? "1px solid #00D9FF" : "1px solid rgba(30, 58, 110, 0.4)",
                  }}
                >
                  {rng}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry Area Chart matching reference image */}
        <TelemetryLiveChart
          data={telemetrySeries}
          metricKey={activeTab}
          unit={metric.unit}
          color={metric.color}
        />

        {/* Bottom Status Bar matching Reference Image Card 5 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid rgba(30, 58, 110, 0.4)",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* Live Data Indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="status-dot online" style={{ width: 10, height: 10 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                Live Data Stream
              </span>
              <span style={{ fontSize: "0.72rem", color: "#64748B" }}>
                Sampling rate: 500ms • Packet loss: 0%
              </span>
            </div>
          </div>

          {/* Last Updated Timestamp & Refresh Button matching reference image */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: "0.82rem",
                color: "#AAB8D0",
                fontFamily: "var(--font-mono)",
              }}
            >
              {lastRefreshed}
            </span>

            <button
              onClick={handleManualRefresh}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(11, 23, 50, 0.8)",
                border: "1px solid rgba(30, 58, 110, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00D9FF",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              title="Manual Telemetry Refresh"
            >
              <RefreshCw
                size={16}
                style={{
                  transform: isRefreshing ? "rotate(360deg)" : "none",
                  transition: "transform 0.5s ease",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
