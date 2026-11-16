import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Terminal,
  Zap,
  ArrowLeft,
  Smartphone,
  Thermometer,
  ShieldAlert,
  Flame,
  Radio,
} from "lucide-react";
import { telemetrySocket } from "../../services/socket";

export const Execution = ({ onBackToBuilder }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [simulatedTemp, setSimulatedTemp] = useState(38.4);
  const [cycleCount, setCycleCount] = useState(1480);
  const [logs, setLogs] = useState([
    { id: 1, time: "11:34:01.210", level: "INFO", text: "Rule Engine cycle #1479 initiated on edge broker" },
    { id: 2, time: "11:34:01.214", level: "INFO", text: "Sensor DEV-001 (Temp Sensor #001) reading: 24.2°C" },
    { id: 3, time: "11:34:01.216", level: "EVAL", text: "Condition '> 35°C' evaluated: 24.2 > 35 => FALSE (Normal)" },
    { id: 4, time: "11:34:02.102", level: "INFO", text: "Telemetry spike received from Server Room 101: 38.4°C" },
    { id: 5, time: "11:34:02.108", level: "WARN", text: "Condition '> 35°C' evaluated: 38.4 > 35 => TRUE (THRESHOLD EXCEEDED)" },
    { id: 6, time: "11:34:02.115", level: "TRIGGER", text: "Executing Action Node: SMS Alert Dispatch" },
    { id: 7, time: "11:34:02.124", level: "SUCCESS", text: "SMS sent to +91 98765 43210: 'High Temp Alert Room 101 - 38.4°C'" },
  ]);

  const isTriggered = simulatedTemp > 35;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCycleCount((c) => c + 1);

      const now = new Date();
      const timeStr = `${now.toTimeString().split(" ")[0]}.${now.getMilliseconds().toString().padStart(3, "0")}`;

      if (simulatedTemp > 35) {
        setLogs((prev) => [
          ...prev.slice(-15),
          {
            id: Date.now(),
            time: timeStr,
            level: "TRIGGER",
            text: `[ACTIVE ALARM] Temp ${simulatedTemp}°C > 35°C -> SMS Dispatched to +91 98765 43210`,
          },
        ]);
      } else {
        setLogs((prev) => [
          ...prev.slice(-15),
          {
            id: Date.now(),
            time: timeStr,
            level: "INFO",
            text: `Cycle OK: Temp is ${simulatedTemp}°C (Below 35°C threshold)`,
          },
        ]);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isRunning, simulatedTemp]);

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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBackToBuilder} className="btn-secondary" style={{ padding: "8px 12px" }}>
            <ArrowLeft size={16} />
            <span>Rule Canvas</span>
          </button>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FFFFFF" }}>
              Live Rule Execution & Simulation
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#64748B" }}>
              Real-time reactive DAG evaluation pipeline with animated flow wires
            </p>
          </div>
        </div>

        {/* Play/Pause & Reset Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={isRunning ? "btn-secondary" : "btn-primary"}
            style={{ padding: "8px 16px", gap: 6 }}
          >
            {isRunning ? <Pause size={15} color="#00D68F" /> : <Play size={15} />}
            <span>{isRunning ? "Engine Running" : "Engine Paused"}</span>
          </button>

          <button
            onClick={() => {
              setSimulatedTemp(24.2);
              setLogs([]);
            }}
            className="btn-secondary"
            style={{ padding: "8px 14px", gap: 6 }}
          >
            <RotateCcw size={15} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Execution Status Banner */}
      <div
        className="glass-card"
        style={{
          padding: "16px 22px",
          background: isTriggered
            ? "linear-gradient(135deg, rgba(255, 71, 87, 0.2) 0%, rgba(14, 20, 50, 0.85) 100%)"
            : "linear-gradient(135deg, rgba(0, 214, 143, 0.15) 0%, rgba(14, 20, 50, 0.85) 100%)",
          border: `1px solid ${isTriggered ? "#FF4757" : "#00D68F"}`,
          boxShadow: isTriggered
            ? "0 0 25px rgba(255, 71, 87, 0.25)"
            : "0 0 20px rgba(0, 214, 143, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: isTriggered ? "rgba(255, 71, 87, 0.3)" : "rgba(0, 214, 143, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isTriggered ? <Flame size={22} color="#FF4757" /> : <Zap size={22} color="#00D68F" />}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: isTriggered ? "#FF4757" : "#00D68F",
                }}
              >
                {isTriggered ? "TRIGGER FIRED: HIGH TEMPERATURE" : "RULE STATUS: EVALUATING NORMAL"}
              </span>
              <span className={`status-dot ${isTriggered ? "offline" : "online"}`} />
            </div>
            <p style={{ fontSize: "0.78rem", color: "#AAB8D0", marginTop: 2 }}>
              Rule: IF Temp Sensor #001 &gt; 35°C THEN Dispatch SMS Alert
            </p>
          </div>
        </div>

        {/* Live Metrics */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.72rem", color: "#64748B" }}>Total Cycles:</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "#FFFFFF" }}>
              #{cycleCount}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.72rem", color: "#64748B" }}>Avg Latency:</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-mono)", color: "#00D9FF" }}>
              12 ms
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sensor Slider Tuning */}
      <div className="glass-card" style={{ padding: "18px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Thermometer size={18} color={simulatedTemp > 35 ? "#FF4757" : "#00D9FF"} />
            <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#FFFFFF" }}>
              Interactive Live Sensor Value Slider
            </span>
          </div>
          <span
            style={{
              fontSize: "1.15rem",
              fontWeight: 800,
              fontFamily: "var(--font-mono)",
              color: simulatedTemp > 35 ? "#FF4757" : "#00D9FF",
            }}
          >
            {simulatedTemp}°C
          </span>
        </div>

        <input
          type="range"
          min="15"
          max="50"
          step="0.2"
          value={simulatedTemp}
          onChange={(e) => setSimulatedTemp(parseFloat(e.target.value))}
          style={{
            width: "100%",
            accentColor: simulatedTemp > 35 ? "#FF4757" : "#00D9FF",
            cursor: "pointer",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#64748B", marginTop: 4 }}>
          <span>15°C (Cool)</span>
          <span style={{ color: "#FFB020", fontWeight: 700 }}>35°C Threshold</span>
          <span>50°C (Critical)</span>
        </div>
      </div>

      {/* Visual Execution Flow Pipeline with Glowing Animated Wires */}
      <div
        className="glass-card"
        style={{
          padding: "36px 24px",
          background: "rgba(5, 11, 31, 0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          position: "relative",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {/* Node 1: Sensor */}
        <div
          style={{
            width: 220,
            background: "rgba(8, 21, 47, 0.95)",
            borderRadius: 14,
            border: "2px solid #00D9FF",
            boxShadow: "0 0 25px rgba(0, 217, 255, 0.4)",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div style={{ background: "rgba(0, 217, 255, 0.2)", padding: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#00D9FF" }}>
            1. DATA SOURCE
          </div>
          <div style={{ padding: "16px" }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>Temp Sensor #001</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: "#00D9FF", margin: "6px 0" }}>
              {simulatedTemp}°C
            </div>
            <span className="badge badge-online" style={{ fontSize: "0.68rem" }}>Emitting MQTT</span>
          </div>
        </div>

        {/* Animated Glowing Connection Wire 1 */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 60,
              height: 4,
              background: "linear-gradient(90deg, #00D9FF, #773CFF)",
              boxShadow: "0 0 12px #00D9FF",
              animation: "edgeFlow 1s linear infinite",
            }}
          />
          <ArrowRight size={20} color="#773CFF" />
        </div>

        {/* Node 2: Condition */}
        <div
          style={{
            width: 220,
            background: "rgba(14, 18, 48, 0.95)",
            borderRadius: 14,
            border: `2px solid ${isTriggered ? "#FF4757" : "#773CFF"}`,
            boxShadow: isTriggered ? "0 0 30px rgba(255, 71, 87, 0.6)" : "0 0 25px rgba(119, 60, 255, 0.4)",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: isTriggered ? "rgba(255, 71, 87, 0.25)" : "rgba(119, 60, 255, 0.25)",
              padding: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: isTriggered ? "#FF4757" : "#A578FF",
            }}
          >
            2. CONDITION EVALUATION
          </div>
          <div style={{ padding: "16px" }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>Threshold Check</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: "#FFFFFF", margin: "6px 0" }}>
              &gt; 35°C
            </div>
            <span
              style={{
                fontSize: "0.72rem",
                padding: "3px 10px",
                borderRadius: 20,
                fontWeight: 700,
                background: isTriggered ? "rgba(255, 71, 87, 0.25)" : "rgba(0, 214, 143, 0.2)",
                color: isTriggered ? "#FF4757" : "#00D68F",
              }}
            >
              {isTriggered ? "EVAL: TRUE (SPIKE)" : "EVAL: FALSE (SAFE)"}
            </span>
          </div>
        </div>

        {/* Animated Glowing Connection Wire 2 */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 60,
              height: 4,
              background: isTriggered
                ? "linear-gradient(90deg, #FF4757, #00D68F)"
                : "rgba(30, 58, 110, 0.5)",
              boxShadow: isTriggered ? "0 0 14px #FF4757" : "none",
            }}
          />
          <ArrowRight size={20} color={isTriggered ? "#00D68F" : "#64748B"} />
        </div>

        {/* Node 3: Action Trigger */}
        <div
          style={{
            width: 220,
            background: "rgba(10, 32, 28, 0.95)",
            borderRadius: 14,
            border: `2px solid ${isTriggered ? "#00D68F" : "rgba(0, 214, 143, 0.3)"}`,
            boxShadow: isTriggered ? "0 0 35px rgba(0, 214, 143, 0.6)" : "none",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div style={{ background: "rgba(0, 214, 143, 0.25)", padding: "8px", fontSize: "0.75rem", fontWeight: 700, color: "#00D68F" }}>
            3. ACTION TRIGGER
          </div>
          <div style={{ padding: "16px" }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>SMS Dispatch</div>
            <div style={{ fontSize: "0.78rem", color: "#AAB8D0", margin: "6px 0" }}>
              +91 98765 43210
            </div>
            <span
              className={isTriggered ? "badge badge-online" : "badge"}
              style={{
                fontSize: "0.72rem",
                padding: "3px 10px",
                background: isTriggered ? undefined : "rgba(255, 255, 255, 0.08)",
                color: isTriggered ? undefined : "#64748B",
              }}
            >
              {isTriggered ? "DISPATCHED" : "STANDBY"}
            </span>
          </div>
        </div>
      </div>

      {/* Execution Logs Terminal */}
      <div
        className="glass-card"
        style={{
          padding: "20px",
          background: "rgba(5, 11, 31, 0.95)",
          border: "1px solid rgba(30, 58, 110, 0.55)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Terminal size={17} color="#00D9FF" />
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
              Real-Time Execution Logs
            </h3>
          </div>
          <button
            onClick={() => setLogs([])}
            style={{
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: "0.76rem",
              cursor: "pointer",
            }}
          >
            Clear Terminal
          </button>
        </div>

        <div
          style={{
            background: "rgba(3, 7, 18, 0.9)",
            borderRadius: 10,
            padding: "14px",
            height: "180px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
          }}
        >
          {logs.map((log) => {
            const color =
              log.level === "TRIGGER"
                ? "#FF4757"
                : log.level === "WARN"
                ? "#FFB020"
                : log.level === "SUCCESS"
                ? "#00D68F"
                : log.level === "EVAL"
                ? "#A578FF"
                : "#00D9FF";

            return (
              <div key={log.id} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#64748B" }}>[{log.time}]</span>
                <span style={{ color, fontWeight: 700, minWidth: 65 }}>[{log.level}]</span>
                <span style={{ color: "#E2EDFF" }}>{log.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
