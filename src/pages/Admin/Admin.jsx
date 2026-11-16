import React from "react";
import {
  Crown,
  Users,
  Cpu,
  Zap,
  CheckCircle2,
  Calendar,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Database,
  Radio,
  GitBranch,
} from "lucide-react";
import { PROJECT_DETAILS } from "../../data/mockData";

export const Admin = ({ setActivePage }) => {
  const { adminMetrics, team, developmentPlan, githubCommits, ourGoal } = PROJECT_DETAILS;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Top Header matching Reference Image Card 10 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(255, 176, 32, 0.25) 0%, rgba(119, 60, 255, 0.25) 100%)",
              border: "1px solid #FFB020",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(255, 176, 32, 0.35)",
            }}
          >
            <Crown size={22} color="#FFD074" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF" }}>
              Admin Panel
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#64748B" }}>
              Infotact Solutions System Health, Cluster Management & Project Oversight
            </p>
          </div>
        </div>

        {/* System Health Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 20,
            background: "rgba(0, 214, 143, 0.15)",
            border: "1px solid rgba(0, 214, 143, 0.4)",
            color: "#00D68F",
            fontWeight: 700,
            fontSize: "0.85rem",
          }}
        >
          <span className="status-dot online" />
          <span>All Services Operational (98% Health)</span>
        </div>
      </div>

      {/* Metric Cards Row matching Reference Image Card 10 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {/* Total Users (24, Purple card) */}
        <div
          className="glass-card"
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, rgba(119, 60, 255, 0.22) 0%, rgba(14, 18, 48, 0.8) 100%)",
            border: "1px solid rgba(119, 60, 255, 0.45)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1,
                }}
              >
                {adminMetrics.totalUsers}
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#D0BCFF", marginTop: 6 }}>
                Total Users
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(119, 60, 255, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={22} color="#D0BCFF" />
            </div>
          </div>
        </div>

        {/* Total Devices (48, Green card) */}
        <div
          className="glass-card"
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, rgba(0, 214, 143, 0.2) 0%, rgba(8, 30, 28, 0.8) 100%)",
            border: "1px solid rgba(0, 214, 143, 0.45)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1,
                }}
              >
                {adminMetrics.totalDevices}
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#74F4C7", marginTop: 6 }}>
                Total Devices
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(0, 214, 143, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cpu size={22} color="#00D68F" />
            </div>
          </div>
        </div>

        {/* Active Rules (12, Orange card) */}
        <div
          className="glass-card"
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, rgba(255, 176, 32, 0.2) 0%, rgba(35, 25, 12, 0.8) 100%)",
            border: "1px solid rgba(255, 176, 32, 0.45)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1,
                }}
              >
                {adminMetrics.activeRules}
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "#FFD074", marginTop: 6 }}>
                Active Rules
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(255, 176, 32, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={22} color="#FFB020" />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: System Health & Recent Activity matching Reference Image Card 10 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: 20 }}>
        {/* System Health Card with Circular Gauge matching reference image */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 18 }}>
            System Health
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            {/* SVG Circular Progress Gauge 98% */}
            <div style={{ position: "relative", width: 110, height: 110 }}>
              <svg width="110" height="110" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="rgba(30, 58, 110, 0.4)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="#00D68F"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset="6"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ filter: "drop-shadow(0 0 8px rgba(0, 214, 143, 0.6))" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  color: "#FFFFFF",
                }}
              >
                98%
              </div>
            </div>

            {/* Status Checklist matching reference image */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#FFFFFF" }}>
                <CheckCircle2 size={16} color="#00D68F" />
                <span>API status preview (demo)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#FFFFFF" }}>
                <CheckCircle2 size={16} color="#00D68F" />
                <span>Database status preview (demo)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#FFFFFF" }}>
                <CheckCircle2 size={16} color="#00D68F" />
                <span>WebSocket status preview (demo)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card matching reference image */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF" }}>
              Recent Activity
            </h3>
            <button
              onClick={() => setActivePage("alerts")}
              style={{ background: "none", border: "none", color: "#00D9FF", fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(6, 15, 37, 0.65)",
                border: "1px solid rgba(30, 58, 110, 0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="status-dot online" style={{ width: 8, height: 8 }} />
                <span style={{ fontSize: "0.84rem", color: "#FFFFFF", fontWeight: 600 }}>
                  New rule created by Yashi
                </span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#64748B" }}>2m ago</span>
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(6, 15, 37, 0.65)",
                border: "1px solid rgba(30, 58, 110, 0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="status-dot online" style={{ width: 8, height: 8 }} />
                <span style={{ fontSize: "0.84rem", color: "#FFFFFF", fontWeight: 600 }}>
                  Device DEV-001 re-calibrated
                </span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#64748B" }}>15m ago</span>
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(6, 15, 37, 0.65)",
                border: "1px solid rgba(30, 58, 110, 0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="status-dot online" style={{ width: 8, height: 8 }} />
                <span style={{ fontSize: "0.84rem", color: "#FFFFFF", fontWeight: 600 }}>
                  MongoDB telemetry collection indexed
                </span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#64748B" }}>1h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner matching Reference Image Footer */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 10,
        }}
      >
        {/* Card 1: 4-Week Development Plan */}
        <div className="glass-card" style={{ padding: "20px", border: "1px solid rgba(0, 217, 255, 0.35)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Calendar size={18} color="#00D9FF" />
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
              4-Week Development Plan (Per Project)
            </h4>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {developmentPlan.map((p) => (
              <div
                key={p.week}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: "rgba(6, 15, 37, 0.7)",
                  border: "1px solid rgba(30, 58, 110, 0.5)",
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "#00D9FF", fontWeight: 700 }}>
                  {p.week}
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#FFFFFF" }}>
                  {p.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Team Work Distribution */}
        <div className="glass-card" style={{ padding: "20px", border: "1px solid rgba(119, 60, 255, 0.35)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Users size={18} color="#A578FF" />
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
              Team Work Distribution
            </h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {team.map((member) => (
              <div
                key={member.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ fontWeight: 600, color: "#FFFFFF" }}>{member.name}</span>
                <span style={{ color: "#AAB8D0" }}>{member.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: GitHub Commit Requirement */}
        <div className="glass-card" style={{ padding: "20px", border: "1px solid rgba(30, 58, 110, 0.6)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
              GitHub Commit Requirement
            </h4>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", color: "#AAB8D0" }}>
            <div>• Mid Review: {githubCommits.midReview}</div>
            <div>• Final Review: {githubCommits.finalReview}</div>
          </div>
        </div>

        {/* Card 4: Our Goal */}
        <div
          className="glass-card"
          style={{
            padding: "20px",
            border: "1px solid rgba(0, 214, 143, 0.4)",
            background: "linear-gradient(135deg, rgba(0, 214, 143, 0.12) 0%, rgba(8, 21, 47, 0.8) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <CheckCircle2 size={18} color="#00D68F" />
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
              Our Goal
            </h4>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#E2EDFF", lineHeight: 1.5 }}>
            {ourGoal}
          </p>
        </div>
      </div>
    </div>
  );
};
