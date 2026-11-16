import React, { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import {
  ArrowLeft,
  Save,
  Play,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Plus,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sliders,
  Code2,
  Cpu,
  Layers,
  HelpCircle,
  X,
  Radio,
} from "lucide-react";
import { nodeTypes } from "../../components/Nodes";
import {
  NODE_LIBRARY_ITEMS,
  INITIAL_REACT_FLOW_NODES,
  INITIAL_REACT_FLOW_EDGES,
} from "../../data/mockData";

const FlowEditor = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  selectedNode,
  setSelectedNode,
  onOpenNodeConfig,
  onSaveGraph,
  onRunGraph,
  onViewJson,
  setActivePage,
}) => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, fitView, zoomIn, zoomOut } = useReactFlow();
  const [validationMessage, setValidationMessage] = useState(null);
  const [saveToast, setSaveToast] = useState(false);

  // Connect handler
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#00D9FF", strokeWidth: 2.5 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Node selection
  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  // Drag and Drop from Node Library to Canvas
  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const rawData = event.dataTransfer.getData("application/reactflow");
      if (!rawData) return;

      const template = JSON.parse(rawData);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeId = `node-${Date.now().toString().slice(-4)}`;
      const newNode = {
        id: newNodeId,
        type: template.type,
        position,
        data: {
          ...template,
          currentValue: template.defaultValue || 24,
          unit: template.defaultUnit || "°C",
          thresholdValue: template.thresholdValue || 35,
          operator: template.operator || ">",
          label: template.label || template.name,
          status: "online",
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNode(newNode);
    },
    [screenToFlowPosition, setNodes, setSelectedNode]
  );

  // Graph Validation Logic
  const handleValidateGraph = () => {
    if (nodes.length === 0) {
      setValidationMessage({
        type: "error",
        text: "Graph is empty! Add at least one Data Source and Action Trigger.",
      });
      return;
    }

    const sourceNodes = nodes.filter((n) => n.type === "dataSource");
    const actionNodes = nodes.filter((n) => n.type === "actionTrigger");

    if (sourceNodes.length === 0) {
      setValidationMessage({
        type: "error",
        text: "Missing Data Source! Drag a sensor (e.g. Temperature Sensor) into the canvas.",
      });
      return;
    }

    if (actionNodes.length === 0) {
      setValidationMessage({
        type: "error",
        text: "Missing Action Trigger! Add an action node (e.g. SMS Alert or Webhook).",
      });
      return;
    }

    if (edges.length === 0) {
      setValidationMessage({ type: "error", text: "Nodes are not connected! Connect the output handle to the input handle." });
      return;
    }

    const nodeIds = new Set(nodes.map((node) => node.id));
    const invalidEdge = edges.find((edge) => !nodeIds.has(edge.source) || !nodeIds.has(edge.target) || edge.source === edge.target);
    if (invalidEdge) {
      setValidationMessage({ type: "error", text: "The graph contains an invalid or self-connected edge. Remove it and reconnect the nodes." });
      return;
    }

    const incomingToSource = edges.find((edge) => sourceNodes.some((node) => node.id === edge.target));
    const outgoingFromAction = edges.find((edge) => actionNodes.some((node) => node.id === edge.source));
    if (incomingToSource || outgoingFromAction) {
      setValidationMessage({ type: "error", text: "Invalid direction: Data Sources cannot receive inputs and Action Triggers cannot send outputs." });
      return;
    }

    const adjacency = new Map(nodes.map((node) => [node.id, []]));
    const reverseAdjacency = new Map(nodes.map((node) => [node.id, []]));
    edges.forEach((edge) => {
      adjacency.get(edge.source)?.push(edge.target);
      reverseAdjacency.get(edge.target)?.push(edge.source);
    });
    const reachableFrom = (start) => {
      const visited = new Set();
      const stack = [start];
      while (stack.length) {
        const current = stack.pop();
        if (visited.has(current)) continue;
        visited.add(current);
        (adjacency.get(current) || []).forEach((next) => stack.push(next));
      }
      return visited;
    };
    const hasCycle = (id, visiting = new Set(), visited = new Set()) => {
      if (visiting.has(id)) return true;
      if (visited.has(id)) return false;
      visiting.add(id);
      for (const next of adjacency.get(id) || []) if (hasCycle(next, visiting, visited)) return true;
      visiting.delete(id);
      visited.add(id);
      return false;
    };
    if (nodes.some((node) => hasCycle(node.id))) {
      setValidationMessage({ type: "error", text: "Cycle detected. Rule workflows must be directed acyclic graphs (DAGs)." });
      return;
    }
    const reverseReachableFrom = (start) => {
      const visited = new Set();
      const stack = [start];
      while (stack.length) {
        const current = stack.pop();
        if (visited.has(current)) continue;
        visited.add(current);
        (reverseAdjacency.get(current) || []).forEach((previous) => stack.push(previous));
      }
      return visited;
    };
    const sourceReach = sourceNodes.map((node) => reachableFrom(node.id));
    const actionReach = actionNodes.map((node) => reverseReachableFrom(node.id));
    const nodesOnValidPath = new Set();
    sourceReach.forEach((fromSource) => actionReach.forEach((toAction) => {
      fromSource.forEach((id) => { if (toAction.has(id)) nodesOnValidPath.add(id); });
    }));
    const invalidPath = actionNodes.some((action) => !sourceReach.some((reachable) => reachable.has(action.id)));
    const disconnected = nodes.some((node) => !nodesOnValidPath.has(node.id));
    if (invalidPath || disconnected) {
      setValidationMessage({ type: "error", text: "Every node must belong to a connected path from a Data Source to an Action Trigger." });
      return;
    }

    setValidationMessage({
      type: "success",
      text: `Graph validated: ${nodes.length} nodes and ${edges.length} connections form a valid DAG.`,
    });

    setTimeout(() => setValidationMessage(null), 4000);
  };

  // Delete selected node
  const handleDeleteSelected = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  };

  const handleTriggerSave = () => {
    onSaveGraph({ nodes, edges });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div
      className="rule-builder-shell"
      style={{
        display: "grid",
        gridTemplateColumns: "270px minmax(0, 1fr)",
        height: "calc(100vh - 120px)",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(30, 58, 110, 0.6)",
        background: "#04091a",
        position: "relative",
      }}
    >
      {/* Save Notification Toast */}
      {saveToast && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 100,
            padding: "12px 18px",
            borderRadius: 12,
            background: "rgba(8, 21, 47, 0.95)",
            border: "1px solid #00D68F",
            color: "#00D68F",
            boxShadow: "0 0 25px rgba(0, 214, 143, 0.35)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: "0.88rem",
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} />
          <span>Workflow Saved Successfully! ({nodes.length} Nodes, {edges.length} Edges)</span>
        </div>
      )}

      {/* Validation Banner */}
      {validationMessage && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            padding: "10px 20px",
            borderRadius: 12,
            background:
              validationMessage.type === "success"
                ? "rgba(10, 32, 28, 0.95)"
                : "rgba(38, 14, 20, 0.95)",
            border: `1px solid ${
              validationMessage.type === "success" ? "#00D68F" : "#FF4757"
            }`,
            color: validationMessage.type === "success" ? "#00D68F" : "#FF4757",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          {validationMessage.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
          <span>{validationMessage.text}</span>
          <button
            onClick={() => setValidationMessage(null)}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Left Sidebar: Node Library matching Reference Image Card 6 */}
      <div
        className="rule-node-library"
        style={{
          background: "linear-gradient(180deg, #08152F 0%, #050B1F 100%)",
          borderRight: "1px solid rgba(30, 58, 110, 0.55)",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
        }}
      >
        <div style={{ paddingBottom: 10, borderBottom: "1px solid rgba(30, 58, 110, 0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={18} color="#00D9FF" />
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>
              Node Library
            </h3>
          </div>
          <p style={{ fontSize: "0.72rem", color: "#64748B", marginTop: 4 }}>
            Drag nodes directly onto the canvas
          </p>
        </div>

        {/* Node Categories List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {NODE_LIBRARY_ITEMS.map((category) => (
            <div key={category.category}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: category.color,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: category.color,
                  }}
                />
                <span>{category.category}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {category.items.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      background: "rgba(11, 23, 50, 0.75)",
                      border: "1px solid rgba(30, 58, 110, 0.45)",
                      color: "#FFFFFF",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      cursor: "grab",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.2s ease",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = category.color;
                      e.currentTarget.style.transform = "translateX(3px)";
                      e.currentTarget.style.boxShadow = `0 0 12px ${category.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(30, 58, 110, 0.45)";
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span>{item.name}</span>
                    <Plus size={14} color={category.color} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Node Quick Info & Configure CTA */}
        {selectedNode && (
          <div
            style={{
              marginTop: "auto",
              padding: "12px",
              borderRadius: 12,
              background: "rgba(14, 31, 71, 0.9)",
              border: "1px solid #00D9FF",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00D9FF" }}>
                Active Node: {selectedNode.id}
              </span>
              <button
                onClick={handleDeleteSelected}
                style={{
                  background: "none",
                  border: "none",
                  color: "#FF4757",
                  cursor: "pointer",
                }}
                title="Delete Node"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div style={{ fontSize: "0.84rem", fontWeight: 600, color: "#FFFFFF" }}>
              {selectedNode.data?.name || selectedNode.type}
            </div>

            <button
              onClick={() => onOpenNodeConfig(selectedNode)}
              className="btn-primary"
              style={{ padding: "6px", fontSize: "0.76rem" }}
            >
              <Sliders size={13} />
              <span>Configure Node</span>
            </button>
          </div>
        )}
      </div>

      {/* Right Canvas Area */}
      <div
        className="rule-canvas-area"
        ref={reactFlowWrapper}
        style={{ width: "100%", height: "100%", position: "relative" }}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {/* Top Control Bar matching Reference Image Card 6 */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          {/* Header & Back Arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(8, 21, 47, 0.9)",
              backdropFilter: "blur(12px)",
              padding: "8px 16px",
              borderRadius: 12,
              border: "1px solid rgba(30, 58, 110, 0.6)",
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={() => setActivePage("dashboard")}
              style={{
                background: "none",
                border: "none",
                color: "#AAB8D0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF" }}>
              Rule Builder
            </h2>
            <span
              style={{
                fontSize: "0.72rem",
                color: "#00D9FF",
                padding: "2px 8px",
                background: "rgba(0, 217, 255, 0.15)",
                borderRadius: 9999,
                fontWeight: 600,
              }}
            >
              Overheat Protection Rule
            </span>
          </div>

          {/* Action Buttons: Validate, View JSON, Save, Run Graph matching reference image */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={handleValidateGraph}
              className="btn-secondary"
              style={{ padding: "8px 14px", fontSize: "0.82rem" }}
              title="Validate all node inputs & outputs"
            >
              <CheckCircle2 size={15} color="#00D9FF" />
              <span>Validate</span>
            </button>

            <button
              onClick={onViewJson}
              className="btn-secondary"
              style={{ padding: "8px 14px", fontSize: "0.82rem" }}
              title="View Serialized JSON Graph"
            >
              <Code2 size={15} color="#A578FF" />
              <span>Graph JSON</span>
            </button>

            {/* [Save] Button matching reference image */}
            <button
              onClick={handleTriggerSave}
              className="btn-secondary"
              style={{
                padding: "8px 18px",
                fontSize: "0.85rem",
                background: "rgba(119, 60, 255, 0.25)",
                borderColor: "#773CFF",
                color: "#FFFFFF",
              }}
            >
              <Save size={15} />
              <span>Save</span>
            </button>

            {/* [Run ▶] Button matching reference image */}
            <button
              onClick={onRunGraph}
              className="btn-success"
              style={{ padding: "8px 20px", fontSize: "0.88rem" }}
            >
              <Play size={16} fill="#050B1F" />
              <span>Run ▶</span>
            </button>
          </div>
        </div>

        {/* React Flow Core Component */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: "#00D9FF", strokeWidth: 2.5 },
          }}
        >
          <Background color="#1e3a6e" gap={24} size={1.5} />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              if (n.type === "dataSource") return "#00D9FF";
              if (n.type === "mathOperation") return "#773CFF";
              if (n.type === "filterCondition") return "#FFB020";
              if (n.type === "actionTrigger") return "#00D68F";
              return "#087BFF";
            }}
            maskColor="rgba(5, 11, 31, 0.75)"
            style={{
              background: "rgba(8, 21, 47, 0.8)",
              border: "1px solid rgba(30, 58, 110, 0.6)",
              borderRadius: 10,
            }}
          />
        </ReactFlow>

        {/* Bottom Zoom & View Controls matching Reference Image Card 6 ("+ 100% +", Fit View) */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(8, 21, 47, 0.9)",
            backdropFilter: "blur(12px)",
            padding: "6px 12px",
            borderRadius: 10,
            border: "1px solid rgba(30, 58, 110, 0.6)",
          }}
        >
          <button
            onClick={() => zoomOut()}
            style={{ background: "none", border: "none", color: "#AAB8D0", cursor: "pointer" }}
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: "0.8rem", color: "#FFFFFF", fontWeight: 600, padding: "0 6px" }}>
            Canvas
          </span>
          <button
            onClick={() => zoomIn()}
            style={{ background: "none", border: "none", color: "#AAB8D0", cursor: "pointer" }}
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <div style={{ width: 1, height: 16, background: "rgba(30, 58, 110, 0.6)", margin: "0 4px" }} />
          <button
            onClick={() => fitView()}
            style={{ background: "none", border: "none", color: "#00D9FF", cursor: "pointer" }}
            title="Fit View"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const RuleBuilder = (props) => {
  return (
    <ReactFlowProvider>
      <FlowEditor {...props} />
    </ReactFlowProvider>
  );
};
