import React, { useState, useEffect } from "react";
import {
  Sliders,
  Save,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Thermometer,
  Layers,
  Settings2,
  Radio,
  FileCode,
  Trash2,
} from "lucide-react";

export const NodeConfiguration = ({
  selectedNode,
  nodes,
  setNodes,
  devices,
  onBackToBuilder,
}) => {
  // If no node selected, default to the first node or a fallback
  const activeNode = selectedNode || nodes[0] || null;

  const [nodeData, setNodeData] = useState({
    name: "",
    type: "dataSource",
    deviceId: "DEV-001",
    sensorType: "Temperature",
    operator: ">",
    thresholdValue: 35,
    unit: "°C",
    operation: "moving_avg",
    windowSize: 5,
    actionType: "sms",
    recipient: "+91 98765 43210",
    message: "High Temperature Alert triggered!",
    ports: { inputs: 1, outputs: 1 },
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (activeNode) {
      setNodeData({
        name: activeNode.data?.name || `Node ${activeNode.id}`,
        type: activeNode.type || "dataSource",
        deviceId: activeNode.data?.deviceId || "DEV-001",
        sensorType: activeNode.data?.sensorType || "Temperature",
        operator: activeNode.data?.operator || ">",
        thresholdValue: activeNode.data?.thresholdValue !== undefined ? activeNode.data.thresholdValue : 35,
        unit: activeNode.data?.unit || "°C",
        operation: activeNode.data?.operation || "moving_avg",
        windowSize: activeNode.data?.windowSize || 5,
        actionType: activeNode.data?.actionType || "sms",
        recipient: activeNode.data?.recipient || "+91 98765 43210",
        message: activeNode.data?.message || "High Temperature detected in Server Room!",
        ports: activeNode.data?.ports || { inputs: 1, outputs: 1 },
      });
    }
  }, [activeNode]);

  const handleSaveNode = (e) => {
    e.preventDefault();
    if (!activeNode) return;

    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (n.id === activeNode.id) {
          return {
            ...n,
            data: {
              ...n.data,
              ...nodeData,
              label:
                nodeData.type === "filterCondition"
                  ? `${nodeData.operator} ${nodeData.thresholdValue}${nodeData.unit}`
                  : nodeData.name,
            },
          };
        }
        return n;
      })
    );

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      if (onBackToBuilder) onBackToBuilder();
    }, 1200);
  };

  if (!activeNode) {
    return (
      <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
        <Sliders size={40} color="#64748B" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF" }}>
          No Node Selected
        </h3>
        <p style={{ color: "#AAB8D0", fontSize: "0.9rem", marginTop: 8, marginBottom: 20 }}>
          Please select a node on the Rule Builder canvas to inspect and configure its parameters.
        </p>
        <button onClick={onBackToBuilder} className="btn-primary">
          <ArrowLeft size={16} />
          <span>Open Rule Builder</span>
        </button>
      </div>
    );
  }

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
          <button
            onClick={onBackToBuilder}
            className="btn-secondary"
            style={{ padding: "8px 12px" }}
          >
            <ArrowLeft size={16} />
            <span>Rule Canvas</span>
          </button>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#FFFFFF" }}>
              Node Configuration
            </h2>
            <span style={{ fontSize: "0.8rem", color: "#64748B" }}>
              Inspecting Node ID:{" "}
              <code style={{ color: "#00D9FF", fontFamily: "var(--font-mono)" }}>
                {activeNode.id}
              </code>
            </span>
          </div>
        </div>

        {savedSuccess && (
          <div
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              background: "rgba(0, 214, 143, 0.2)",
              border: "1px solid #00D68F",
              color: "#00D68F",
              fontSize: "0.85rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <CheckCircle2 size={16} />
            <span>Node Updated & Synchronized!</span>
          </div>
        )}
      </div>

      {/* Main Configuration Grid */}
      <form onSubmit={handleSaveNode}>
        <div className="node-config-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}>
          {/* Left Form: Properties & Tuning */}
          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ paddingBottom: 12, borderBottom: "1px solid rgba(30, 58, 110, 0.5)" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF" }}>
                Node Parameters
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#AAB8D0", marginTop: 2 }}>
                Configure execution parameters, sensor bindings, and logic rules
              </p>
            </div>

            {/* Node Name */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                Node Display Name
              </label>
              <input
                type="text"
                required
                value={nodeData.name}
                onChange={(e) => setNodeData({ ...nodeData, name: e.target.value })}
                className="input-field"
                placeholder="e.g. Temp Sensor #001"
              />
            </div>

            {/* Dynamic fields based on node type */}
            {activeNode.type === "dataSource" && (
              <>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                    Connected IoT Device Binding
                  </label>
                  <select
                    value={nodeData.deviceId}
                    onChange={(e) => {
                      const dev = devices.find((d) => d.id === e.target.value);
                      setNodeData({
                        ...nodeData,
                        deviceId: e.target.value,
                        sensorType: dev ? dev.type : nodeData.sensorType,
                        unit: dev ? dev.unit : nodeData.unit,
                      });
                    }}
                    className="input-field"
                  >
                    {devices.map((dev) => (
                      <option key={dev.id} value={dev.id}>
                        {dev.name} ({dev.id}) – {dev.value} {dev.unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                      Sensor Type
                    </label>
                    <input
                      type="text"
                      disabled
                      value={nodeData.sensorType}
                      className="input-field"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                      Measurement Unit
                    </label>
                    <input
                      type="text"
                      value={nodeData.unit}
                      onChange={(e) => setNodeData({ ...nodeData, unit: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              </>
            )}

            {activeNode.type === "filterCondition" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                      Comparison Operator
                    </label>
                    <select
                      value={nodeData.operator}
                      onChange={(e) => setNodeData({ ...nodeData, operator: e.target.value })}
                      className="input-field"
                    >
                      <option value=">">Greater than (&gt;)</option>
                      <option value="<">Less than (&lt;)</option>
                      <option value=">=">Greater or Equal (&gt;=)</option>
                      <option value="<=">Less or Equal (&lt;=)</option>
                      <option value="==">Exact Match (==)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                      Threshold Value ({nodeData.unit})
                    </label>
                    <input
                      type="number"
                      value={nodeData.thresholdValue}
                      onChange={(e) => setNodeData({ ...nodeData, thresholdValue: parseFloat(e.target.value) || 0 })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Range Slider for visual tuning */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.78rem", color: "#AAB8D0" }}>Threshold Slider</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#00D9FF" }}>
                      {nodeData.thresholdValue} {nodeData.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={nodeData.thresholdValue}
                    onChange={(e) => setNodeData({ ...nodeData, thresholdValue: parseFloat(e.target.value) })}
                    style={{ width: "100%", accentColor: "#00D9FF", cursor: "pointer" }}
                  />
                </div>
              </>
            )}

            {activeNode.type === "mathOperation" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                    Mathematical Operation
                  </label>
                  <select
                    value={nodeData.operation}
                    onChange={(e) => setNodeData({ ...nodeData, operation: e.target.value })}
                    className="input-field"
                  >
                    <option value="moving_avg">Moving Average</option>
                    <option value="sum">Sum</option>
                    <option value="avg">Average</option>
                    <option value="min">Minimum</option>
                    <option value="max">Maximum</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                    Window Size (Samples)
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="100"
                    value={nodeData.windowSize}
                    onChange={(e) => setNodeData({ ...nodeData, windowSize: parseInt(e.target.value) || 5 })}
                    className="input-field"
                  />
                </div>
              </div>
            )}

            {activeNode.type === "actionTrigger" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                      Action Protocol
                    </label>
                    <select
                      value={nodeData.actionType}
                      onChange={(e) => setNodeData({ ...nodeData, actionType: e.target.value })}
                      className="input-field"
                    >
                      <option value="sms">SMS Alert</option>
                      <option value="webhook">Webhook POST</option>
                      <option value="notification">Push Notification</option>
                      <option value="actuator">Device GPIO Action</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                      Target Destination
                    </label>
                    <input
                      type="text"
                      value={nodeData.recipient}
                      onChange={(e) => setNodeData({ ...nodeData, recipient: e.target.value })}
                      placeholder="+91 98765 43210 or URL"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#E2EDFF", marginBottom: 6 }}>
                    Alert Payload Message
                  </label>
                  <textarea
                    rows={3}
                    value={nodeData.message}
                    onChange={(e) => setNodeData({ ...nodeData, message: e.target.value })}
                    className="input-field"
                    style={{ resize: "vertical" }}
                  />
                </div>
              </>
            )}

            {/* Input / Output Settings */}
            <div style={{ paddingTop: 10, borderTop: "1px solid rgba(30, 58, 110, 0.4)" }}>
              <div style={{ fontSize: "0.84rem", fontWeight: 600, color: "#FFFFFF", marginBottom: 10 }}>
                Port Routing Configuration
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    background: "rgba(6, 15, 37, 0.6)",
                    border: "1px solid rgba(30, 58, 110, 0.5)",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Input Handles:</span>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#00D9FF" }}>
                    {activeNode.type === "dataSource" ? "0 (Source Origin)" : "1 (Target Port)"}
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    background: "rgba(6, 15, 37, 0.6)",
                    border: "1px solid rgba(30, 58, 110, 0.5)",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Output Handles:</span>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#00D68F" }}>
                    {activeNode.type === "actionTrigger" ? "0 (Sink Terminal)" : "1 (Source Port)"}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10 }}>
              <button type="button" onClick={onBackToBuilder} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ padding: "10px 24px" }}>
                <Save size={16} />
                <span>Save Node</span>
              </button>
            </div>
          </div>

          {/* Right Panel: Live Node Preview & Inspection */}
          <div className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF" }}>
                Live Canvas Node Preview
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#AAB8D0", marginTop: 2 }}>
                How this node appears in the Visual Graph Editor
              </p>
            </div>

            {/* Preview Box */}
            <div
              style={{
                padding: "30px 20px",
                borderRadius: 14,
                background: "rgba(4, 9, 26, 0.9)",
                border: "1px dashed rgba(0, 217, 255, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 210,
                  background: "rgba(8, 21, 47, 0.95)",
                  border: "2px solid #00D9FF",
                  borderRadius: 14,
                  boxShadow: "0 0 25px rgba(0, 217, 255, 0.35)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(90deg, rgba(8, 123, 255, 0.4) 0%, rgba(0, 217, 255, 0.2) 100%)",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00D9FF" }}>
                    {nodeData.type.toUpperCase()}
                  </span>
                  <span className="badge badge-online" style={{ fontSize: "0.65rem", padding: "1px 6px" }}>
                    ACTIVE
                  </span>
                </div>

                <div style={{ padding: "12px" }}>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#FFFFFF" }}>
                    {nodeData.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#AAB8D0", marginTop: 4 }}>
                    {nodeData.type === "filterCondition"
                      ? `Rule: ${nodeData.operator} ${nodeData.thresholdValue}${nodeData.unit}`
                      : nodeData.type === "actionTrigger"
                      ? `Action: ${nodeData.recipient}`
                      : `Device: ${nodeData.deviceId}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Node Raw Data */}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#64748B", marginBottom: 6 }}>
                Runtime State Inspector
              </div>
              <pre
                style={{
                  background: "rgba(5, 11, 31, 0.8)",
                  border: "1px solid rgba(30, 58, 110, 0.45)",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: "#00D9FF",
                  overflowX: "auto",
                  maxHeight: "180px",
                }}
              >
                {JSON.stringify({ id: activeNode.id, type: activeNode.type, data: nodeData }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
