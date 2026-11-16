import React, { useState } from "react";
import {
  Search,
  Bell,
  Menu,
  Wifi,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

export const Navbar = ({
  activePage,
  setActivePage,
  setIsMobileOpen,
  alerts,
  searchQuery,
  setSearchQuery,
  systemOnline = true,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadAlerts = alerts.filter((a) => !a.read);

  const getPageTitle = (page) => {
    switch (page) {
      case "dashboard":
        return "IoT Dashboard";
      case "devices":
        return "Device Monitoring & Fleet Control";
      case "telemetry":
        return "Real-Time Telemetry Stream";
      case "ruleBuilder":
        return "Visual Rule Builder";
      case "nodeConfig":
        return "Node Inspector & Configuration";
      case "graphJson":
        return "Graph JSON Serialization";
      case "liveExecution":
        return "Live Rule Execution & Simulation";
      case "automationRules":
        return "Automation Rules Manager";
      case "alerts":
        return "Alerts & Notifications Center";
      case "admin":
        return "Admin Operations Panel";
      case "settings":
        return "Profile & System Settings";
      default:
        return "IoT Platform";
    }
  };

  return (
    <header
      className="nexus-navbar"
      style={{
        height: 72,
        background: "rgba(8, 21, 47, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(30, 58, 110, 0.55)",
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* Left: Mobile hamburger & Active Page Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="btn-ghost mobile-menu-btn"
          style={{ display: "none", padding: 6 }}
        >
          <Menu size={22} color="#00D9FF" />
        </button>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            {getPageTitle(activePage)}
          </h1>
          <span style={{ fontSize: "0.74rem", color: "#64748B" }}>
            NexusFlow v2.4 • Frontend Demo Mode
          </span>
        </div>
      </div>

      {/* Middle: Universal Search Bar */}
      <div
        className="nexus-navbar-search"
        style={{
          position: "relative",
          width: "360px",
          maxWidth: "38vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Search
          size={16}
          color="#64748B"
          style={{ position: "absolute", left: 14, pointerEvents: "none" }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search devices, rules, telemetry..."
          className="input-field"
          style={{
            paddingLeft: 38,
            paddingRight: 14,
            height: 38,
            fontSize: "0.86rem",
            borderRadius: 20,
          }}
        />
      </div>

      {/* Right Actions: System Health Badge, Notifications, User */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Online Status Pill matching reference image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "5px 12px",
            borderRadius: 20,
            background: "rgba(0, 214, 143, 0.12)",
            border: "1px solid rgba(0, 214, 143, 0.35)",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#00D68F",
          }}
        >
          <span className="status-dot online" />
          <span>Online</span>
        </div>

        {/* Notifications Icon with Popup */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "1px solid rgba(30, 58, 110, 0.6)",
              background: "rgba(11, 23, 50, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00D9FF";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 217, 255, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(30, 58, 110, 0.6)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Bell size={18} color="#AAB8D0" />
            {unreadAlerts.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#FF4757",
                  boxShadow: "0 0 8px #FF4757",
                }}
              />
            )}
          </button>

          {/* Quick Notification Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: 48,
                right: 0,
                width: 320,
                background: "rgba(8, 21, 47, 0.96)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(0, 217, 255, 0.4)",
                borderRadius: 14,
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 217, 255, 0.2)",
                zIndex: 60,
                padding: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 8,
                  borderBottom: "1px solid rgba(30, 58, 110, 0.4)",
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Bell size={15} color="#00D9FF" />
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                    Recent Notifications ({unreadAlerts.length})
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 260, overflowY: "auto" }}>
                {alerts.slice(0, 4).map((alt) => (
                  <div
                    key={alt.id}
                    onClick={() => {
                      setShowNotifications(false);
                      setActivePage("alerts");
                    }}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: alt.read ? "rgba(11, 23, 50, 0.5)" : "rgba(14, 31, 71, 0.8)",
                      border: `1px solid ${
                        alt.severity === "critical"
                          ? "rgba(255, 71, 87, 0.4)"
                          : "rgba(30, 58, 110, 0.4)"
                      }`,
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#FFFFFF" }}>
                        {alt.title}
                      </span>
                      <span style={{ fontSize: "0.68rem", color: "#64748B" }}>{alt.timestamp}</span>
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "#AAB8D0" }}>{alt.location}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowNotifications(false);
                  setActivePage("alerts");
                }}
                className="btn-primary"
                style={{ width: "100%", marginTop: 8, padding: "6px", fontSize: "0.78rem" }}
              >
                View All Alerts
              </button>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div
          onClick={() => setActivePage("settings")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "4px 8px 4px 4px",
            borderRadius: 24,
            background: "rgba(11, 23, 50, 0.7)",
            border: "1px solid rgba(30, 58, 110, 0.5)",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #087BFF 0%, #773CFF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#FFFFFF",
            }}
          >
            Y
          </div>
          <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#FFFFFF" }}>
            Yashi
          </span>
        </div>
      </div>
    </header>
  );
};
