import React from "react";
import {
  LayoutDashboard,
  Cpu,
  Activity,
  GitFork,
  Zap,
  Bell,
  Settings,
  ShieldAlert,
  Sliders,
  Code2,
  Play,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { NexusLogo } from "../NexusLogo";

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "devices", label: "Devices", icon: Cpu, badge: "12" },
  { id: "telemetry", label: "Telemetry", icon: Activity, live: true },
  { id: "ruleBuilder", label: "Rule Builder", icon: GitFork, highlight: true },
  { id: "automationRules", label: "Automation Rules", icon: Zap },
  { id: "alerts", label: "Alerts", icon: Bell, badge: "4", badgeColor: "#FF4757" },
  { id: "admin", label: "Admin Panel", icon: ShieldAlert },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activePage, setActivePage, isMobileOpen, setIsMobileOpen, unreadAlerts = 4, onLogout }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
        />
      )}

      <aside
        style={{
          width: 250,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          background: "linear-gradient(180deg, #08152F 0%, #050B1F 100%)",
          borderRight: "1px solid rgba(30, 58, 110, 0.55)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 50,
          padding: "20px 16px",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isMobileOpen ? "translateX(0)" : undefined,
          boxShadow: "4px 0 25px rgba(0, 0, 0, 0.5)",
        }}
        className="nexus-sidebar"
      >
        {/* Top Logo */}
        <div>
          <div
            onClick={() => setActivePage("dashboard")}
            style={{
              cursor: "pointer",
              padding: "4px 8px 24px 8px",
              borderBottom: "1px solid rgba(30, 58, 110, 0.35)",
              marginBottom: 16,
            }}
          >
            <NexusLogo size={32} subtitle="IoT Rule Engine" />
          </div>

          {/* Navigation Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "none",
                    background: isActive
                      ? "linear-gradient(135deg, #087BFF 0%, #773CFF 100%)"
                      : "transparent",
                    color: isActive ? "#FFFFFF" : "#AAB8D0",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive
                      ? "0 4px 18px rgba(8, 123, 255, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)"
                      : "none",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(14, 31, 71, 0.65)";
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.transform = "translateX(3px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#AAB8D0";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon
                      size={18}
                      color={isActive ? "#FFFFFF" : item.highlight ? "#00D9FF" : "#AAB8D0"}
                    />
                    <span>{item.label}</span>
                  </div>

                  {/* Badges / indicators */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {item.live && (
                      <span
                        className="status-dot online"
                        style={{ width: 6, height: 6 }}
                        title="Demo telemetry indicator"
                      />
                    )}
                    {item.badge && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 9999,
                          background: isActive
                            ? "rgba(255, 255, 255, 0.25)"
                            : item.badgeColor || "rgba(8, 123, 255, 0.2)",
                          color: isActive ? "#FFFFFF" : item.badgeColor ? "#FFFFFF" : "#00D9FF",
                        }}
                      >
                        {item.id === "alerts" ? unreadAlerts : item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div>
          {/* Quick Sub-Navigation for Rule Builder Sub-Screens */}
          <div
            style={{
              padding: "10px 12px",
              background: "rgba(6, 15, 37, 0.7)",
              border: "1px solid rgba(30, 58, 110, 0.45)",
              borderRadius: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 6,
                fontWeight: 700,
              }}
            >
              Rule Engine Suite
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              <button
                onClick={() => setActivePage("ruleBuilder")}
                style={{
                  padding: "5px 6px",
                  borderRadius: 6,
                  border: "none",
                  background: activePage === "ruleBuilder" ? "rgba(0, 217, 255, 0.2)" : "transparent",
                  color: activePage === "ruleBuilder" ? "#00D9FF" : "#AAB8D0",
                  fontSize: "0.73rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  textAlign: "left",
                }}
              >
                <GitFork size={12} />
                <span>Builder</span>
              </button>

              <button
                onClick={() => setActivePage("nodeConfig")}
                style={{
                  padding: "5px 6px",
                  borderRadius: 6,
                  border: "none",
                  background: activePage === "nodeConfig" ? "rgba(0, 217, 255, 0.2)" : "transparent",
                  color: activePage === "nodeConfig" ? "#00D9FF" : "#AAB8D0",
                  fontSize: "0.73rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Sliders size={12} />
                <span>Config</span>
              </button>

              <button
                onClick={() => setActivePage("graphJson")}
                style={{
                  padding: "5px 6px",
                  borderRadius: 6,
                  border: "none",
                  background: activePage === "graphJson" ? "rgba(0, 217, 255, 0.2)" : "transparent",
                  color: activePage === "graphJson" ? "#00D9FF" : "#AAB8D0",
                  fontSize: "0.73rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Code2 size={12} />
                <span>JSON</span>
              </button>

              <button
                onClick={() => setActivePage("liveExecution")}
                style={{
                  padding: "5px 6px",
                  borderRadius: 6,
                  border: "none",
                  background: activePage === "liveExecution" ? "rgba(0, 217, 255, 0.2)" : "transparent",
                  color: activePage === "liveExecution" ? "#00D68F" : "#AAB8D0",
                  fontSize: "0.73rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Play size={12} />
                <span>Execute</span>
              </button>
            </div>
          </div>

          {/* User Profile Pill matching reference image */}
          <div
            onClick={() => setActivePage("settings")}
            style={{
              padding: "8px 10px",
              background: "rgba(11, 23, 50, 0.8)",
              border: "1px solid rgba(30, 58, 110, 0.5)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#00D9FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(30, 58, 110, 0.5)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #087BFF 0%, #773CFF 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#FFFFFF",
                  boxShadow: "0 0 10px rgba(119, 60, 255, 0.4)",
                }}
              >
                Y
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FFFFFF" }}>
                  Yashi
                </span>
                <span style={{ fontSize: "0.68rem", color: "#64748B" }}>
                  Lead Engineer
                </span>
              </div>
            </div>

            <ChevronRight size={16} color="#AAB8D0" />
          </div>

          {/* Switch to Login / Logout */}
          <button
            onClick={() => onLogout ? onLogout() : setActivePage("login")}
            style={{
              width: "100%",
              marginTop: 10,
              padding: "6px 8px",
              background: "transparent",
              border: "1px dashed rgba(30, 58, 110, 0.5)",
              borderRadius: 8,
              color: "#64748B",
              fontSize: "0.74rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FF4757";
              e.currentTarget.style.borderColor = "rgba(255, 71, 87, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748B";
              e.currentTarget.style.borderColor = "rgba(30, 58, 110, 0.5)";
            }}
          >
            <LogOut size={12} />
            <span>Switch / Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
