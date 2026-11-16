import React, { useState } from "react";
import {
  Code2,
  Copy,
  Download,
  Check,
  ArrowLeft,
  FileJson,
  Sparkles,
  RefreshCw,
  FolderOpen,
} from "lucide-react";

export const GraphJSON = ({ nodes, edges, onBackToBuilder, onApplySampleGraph }) => {
  const [copied, setCopied] = useState(false);

  // Serialized Graph Object
  const serializedGraph = {
    schemaVersion: "2.4.0",
    engine: "NexusFlow Visual IoT Engine",
    project: "NexusFlow – Visual IoT Telemetry & Rule Engine",
    exportedAt: new Date().toISOString(),
    ruleMetadata: {
      id: "RULE-2026-X1",
      name: "Server Room Overheat & SMS Alert Dispatch",
      author: "Yashi",
      environment: "production",
      active: true,
    },
    graph: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data,
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: Boolean(e.animated),
        style: e.style,
      })),
    },
  };

  const jsonString = JSON.stringify(serializedGraph, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.alert("Clipboard access is unavailable. Please use Download JSON instead.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nexusflow_graph_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
              Graph JSON Serialization
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#64748B" }}>
              Deterministic DAG Representation for Edge Rule Engine Runtime
            </p>
          </div>
        </div>

        {/* Actions: Copy & Download */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{ padding: "8px 16px", gap: 6 }}
          >
            {copied ? <Check size={16} color="#00D68F" /> : <Copy size={16} />}
            <span>{copied ? "Copied JSON!" : "Copy JSON"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="btn-primary"
            style={{ padding: "8px 18px", gap: 6 }}
          >
            <Download size={16} />
            <span>Download JSON</span>
          </button>
        </div>
      </div>

      {/* Main JSON Container */}
      <div
        className="glass-card"
        style={{
          background: "rgba(5, 11, 31, 0.92)",
          border: "1px solid rgba(0, 217, 255, 0.35)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Editor Title Bar */}
        <div
          style={{
            background: "rgba(8, 21, 47, 0.9)",
            padding: "12px 18px",
            borderBottom: "1px solid rgba(30, 58, 110, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF4757" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFB020" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00D68F" }} />
            </div>
            <span
              style={{
                fontSize: "0.82rem",
                fontFamily: "var(--font-mono)",
                color: "#AAB8D0",
              }}
            >
              workflow_manifest.json ({nodes.length} nodes, {edges.length} edges)
            </span>
          </div>

          <span className="badge badge-info" style={{ fontSize: "0.72rem" }}>
            Auto-Sync Active
          </span>
        </div>

        {/* Code View with JetBrains Mono */}
        <div style={{ padding: "20px", maxHeight: "560px", overflowY: "auto" }}>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              color: "#00D9FF",
              margin: 0,
            }}
          >
            {jsonString}
          </pre>
        </div>
      </div>
    </div>
  );
};
