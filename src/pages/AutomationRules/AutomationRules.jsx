import React, { useState } from "react";
import {
  Zap,
  Plus,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Radio,
  Play,
} from "lucide-react";

export const AutomationRules = ({
  rules,
  setRules,
  setActivePage,
  onEditRuleInBuilder,
}) => {
  const [filter, setFilter] = useState("all"); // all | active | inactive

  const filteredRules = rules.filter((r) => {
    if (filter === "active") return r.active;
    if (filter === "inactive") return !r.active;
    return true;
  });

  const handleToggleRule = (id) => {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleDeleteRule = (id) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header matching Reference Image Card 9 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Zap size={24} color="#00D9FF" />
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF" }}>
            Automation Rules
          </h2>
        </div>

        <button
          onClick={() => setActivePage("ruleBuilder")}
          className="btn-primary"
          style={{ padding: "8px 18px", gap: 6 }}
        >
          <Plus size={16} />
          <span>+ New Rule</span>
        </button>
      </div>

      {/* Tabs Filter matching Reference Image Card 9: All (3), Active (2), Inactive (1) */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { id: "all", label: `All (${rules.length})` },
          { id: "active", label: `Active (${rules.filter((r) => r.active).length})` },
          { id: "inactive", label: `Inactive (${rules.filter((r) => !r.active).length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: filter === tab.id ? "1px solid #00D9FF" : "1px solid rgba(30, 58, 110, 0.45)",
              background: filter === tab.id ? "rgba(0, 217, 255, 0.2)" : "rgba(6, 15, 37, 0.6)",
              color: filter === tab.id ? "#00D9FF" : "#AAB8D0",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rules List matching Reference Image Card 9 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="glass-card"
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              border: rule.active ? "1px solid rgba(0, 217, 255, 0.35)" : "1px solid rgba(30, 58, 110, 0.4)",
            }}
          >
            {/* Rule Name and Condition */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Working Toggle Switch matching reference image */}
              <div
                onClick={() => handleToggleRule(rule.id)}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 20,
                  background: rule.active ? "#00D68F" : "rgba(30, 58, 110, 0.7)",
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: rule.active ? "0 0 10px rgba(0, 214, 143, 0.5)" : "none",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    transform: rule.active ? "translateX(20px)" : "translateX(0)",
                    transition: "transform 0.25s ease",
                  }}
                />
              </div>

              <div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>
                  {rule.name}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: rule.active ? "#00D9FF" : "#64748B",
                    fontFamily: "var(--font-mono)",
                    marginTop: 3,
                  }}
                >
                  {rule.condition}
                </div>
              </div>
            </div>

            {/* Actions: Edit, Delete, Quick Run */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={() => onEditRuleInBuilder(rule)}
                style={{
                  background: "rgba(14, 31, 71, 0.7)",
                  border: "1px solid rgba(30, 58, 110, 0.6)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: "#AAB8D0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "0.76rem",
                }}
                title="Edit in Visual Rule Builder"
              >
                <Edit2 size={14} color="#00D9FF" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDeleteRule(rule.id)}
                style={{
                  background: "rgba(35, 12, 18, 0.7)",
                  border: "1px solid rgba(255, 71, 87, 0.4)",
                  borderRadius: 8,
                  padding: "6px 10px",
                  color: "#FF4757",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "0.76rem",
                }}
                title="Delete Rule"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rule Execution Log sub-card matching Reference Image Card 9 */}
      <div className="glass-card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: 12 }}>
          Rule Execution Log
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(6, 15, 37, 0.7)",
              border: "1px solid rgba(30, 58, 110, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="status-dot online" style={{ width: 8, height: 8 }} />
              <span style={{ fontSize: "0.84rem", color: "#FFFFFF", fontWeight: 600 }}>
                Rule Triggered – Temp Alert Rule
              </span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#64748B" }}>2m ago</span>
          </div>

          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(6, 15, 37, 0.7)",
              border: "1px solid rgba(30, 58, 110, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="status-dot online" style={{ width: 8, height: 8 }} />
              <span style={{ fontSize: "0.84rem", color: "#FFFFFF", fontWeight: 600 }}>
                Action Sent – SMS (+91 98765 43210)
              </span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#64748B" }}>2m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
