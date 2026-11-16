import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Filter,
  Check,
  Trash2,
  Download,
  Smartphone,
  Globe,
  Cpu,
  ChevronRight,
  Flame,
} from "lucide-react";

export const Alerts = ({ alerts, setAlerts, setActivePage }) => {
  const [filterCategory, setFilterCategory] = useState("all"); // all | SMS | Webhook | System | critical
  const [search, setSearch] = useState("");

  const filteredAlerts = alerts.filter((alt) => {
    const matchesCategory =
      filterCategory === "all" ||
      alt.category.toLowerCase() === filterCategory.toLowerCase() ||
      alt.severity.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch =
      alt.title.toLowerCase().includes(search.toLowerCase()) ||
      alt.location.toLowerCase().includes(search.toLowerCase()) ||
      (alt.detail && alt.detail.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleMarkAllRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  const handleClearAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const getAlertIcon = (severity, title) => {
    if (severity === "critical" || title.includes("Temperature")) {
      return <Flame size={18} color="#FF4757" />;
    }
    if (severity === "success" || title.includes("Executed")) {
      return <CheckCircle2 size={18} color="#00D68F" />;
    }
    if (severity === "warning" || title.includes("Offline")) {
      return <AlertTriangle size={18} color="#FFB020" />;
    }
    return <Info size={18} color="#00D9FF" />;
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "critical":
        return {
          border: "rgba(255, 71, 87, 0.45)",
          bg: "rgba(255, 71, 87, 0.15)",
          color: "#FF4757",
        };
      case "success":
        return {
          border: "rgba(0, 214, 143, 0.45)",
          bg: "rgba(0, 214, 143, 0.15)",
          color: "#00D68F",
        };
      case "warning":
        return {
          border: "rgba(255, 176, 32, 0.45)",
          bg: "rgba(255, 176, 32, 0.15)",
          color: "#FFB020",
        };
      case "info":
      default:
        return {
          border: "rgba(0, 217, 255, 0.45)",
          bg: "rgba(0, 217, 255, 0.15)",
          color: "#00D9FF",
        };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Top Header */}
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
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF" }}>
            Alerts & Notifications
          </h2>
          <p style={{ fontSize: "0.82rem", color: "#64748B" }}>
            Real-time incident dispatch, threshold violations, and telemetry triggers
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={handleMarkAllRead} className="btn-secondary" style={{ padding: "8px 14px" }}>
            <Check size={15} />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs matching Screen 10 */}
      <div
        className="glass-card"
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Alerts" },
            { id: "critical", label: "Critical" },
            { id: "SMS", label: "SMS Alerts" },
            { id: "Webhook", label: "Webhooks" },
            { id: "System", label: "System Events" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: filterCategory === tab.id ? "1px solid #00D9FF" : "1px solid rgba(30, 58, 110, 0.4)",
                background: filterCategory === tab.id ? "rgba(0, 217, 255, 0.2)" : "rgba(6, 15, 37, 0.6)",
                color: filterCategory === tab.id ? "#00D9FF" : "#AAB8D0",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ width: 260 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter alerts..."
            className="input-field"
            style={{ height: 36, fontSize: "0.82rem" }}
          />
        </div>
      </div>

      {/* Alerts Feed List matching Reference Image Card 7 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredAlerts.length === 0 ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>
            No alerts found matching current filter.
          </div>
        ) : (
          filteredAlerts.map((alt) => {
            const style = getSeverityStyle(alt.severity);

            return (
              <div
                key={alt.id}
                className="glass-card"
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16,
                  border: `1px solid ${style.border}`,
                  boxShadow: alt.severity === "critical" ? "0 0 20px rgba(255, 71, 87, 0.25)" : undefined,
                }}
              >
                {/* Left: Icon & Alert Title/Location matching reference image */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 280 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: style.bg,
                      border: `1px solid ${style.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {getAlertIcon(alt.severity, alt.title)}
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>
                        {alt.title}
                      </h4>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          padding: "2px 8px",
                          borderRadius: 9999,
                          fontWeight: 700,
                          background: style.bg,
                          color: style.color,
                          textTransform: "uppercase",
                        }}
                      >
                        {alt.category}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.85rem", color: style.color, fontWeight: 600, marginTop: 3 }}>
                      {alt.location}
                    </div>

                    {alt.detail && (
                      <p style={{ fontSize: "0.78rem", color: "#AAB8D0", marginTop: 4, lineHeight: 1.4 }}>
                        {alt.detail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Timestamp & Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.76rem", color: "#64748B" }}>
                    <Clock size={13} />
                    <span>{alt.timestamp}</span>
                  </div>

                  <button
                    onClick={() => handleClearAlert(alt.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#64748B",
                      cursor: "pointer",
                      padding: 4,
                    }}
                    title="Dismiss Alert"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
