import React, { useState, useEffect, useCallback } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import "./App.css";

// Components
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import { TopProjectBanner } from "./components/TopProjectBanner";

// Pages
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Devices } from "./pages/Devices/Devices";
import { Telemetry } from "./pages/Telemetry/Telemetry";
import { RuleBuilder } from "./pages/RuleBuilder/RuleBuilder";
import { NodeConfiguration } from "./pages/NodeConfiguration/NodeConfiguration";
import { GraphJSON } from "./pages/GraphJSON/GraphJSON";
import { Execution } from "./pages/Execution/Execution";
import { Alerts } from "./pages/Alerts/Alerts";
import { AutomationRules } from "./pages/AutomationRules/AutomationRules";
import { Settings } from "./pages/Settings/Settings";
import { Admin } from "./pages/Admin/Admin";

// Services (Connected to Express & MongoDB backend)
import { deviceService, ruleService, alertService } from "./services/api";

// Fallback Mock Data
import {
  INITIAL_DEVICES,
  INITIAL_ALERTS,
  INITIAL_AUTOMATION_RULES,
  INITIAL_REACT_FLOW_NODES,
  INITIAL_REACT_FLOW_EDGES,
} from "./data/mockData";

export function App() {
  // Navigation & Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem("nexusflow-auth") === "true");
  const [activePage, setActivePage] = useState(() => sessionStorage.getItem("nexusflow-auth") === "true" ? "dashboard" : "login");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // App Data States
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [rules, setRules] = useState(INITIAL_AUTOMATION_RULES);
  const [selectedDeviceForTelemetry, setSelectedDeviceForTelemetry] = useState(null);

  // React Flow Nodes and Edges State
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_REACT_FLOW_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_REACT_FLOW_EDGES);
  const [selectedNode, setSelectedNode] = useState(INITIAL_REACT_FLOW_NODES[0]);

  // Restore the user's visual workflow locally so the frontend remains useful without a backend.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexusflow-graph");
      if (saved) {
        const graph = JSON.parse(saved);
        if (Array.isArray(graph.nodes) && Array.isArray(graph.edges)) {
          setNodes(graph.nodes);
          setEdges(graph.edges);
          setSelectedNode(graph.nodes[0] || null);
        }
      }
    } catch (error) {
      console.warn("Saved workflow could not be restored:", error);
    }
  }, [setNodes, setEdges]);

  // Load optional persistent data from backend API on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [loadedDevices, loadedRules, loadedAlerts, savedGraph] = await Promise.all([
          deviceService.getAll(),
          ruleService.getAll(),
          alertService.getAll(),
          ruleService.getGraph("rule-1"),
        ]);

        if (loadedDevices && loadedDevices.length) setDevices(loadedDevices);
        if (loadedRules && loadedRules.length) setRules(loadedRules);
        if (loadedAlerts && loadedAlerts.length) setAlerts(loadedAlerts);

        // Load persisted graph DAG if available in storage/MongoDB
        if (savedGraph && savedGraph.nodes && savedGraph.nodes.length) {
          setNodes(savedGraph.nodes);
          if (savedGraph.edges) setEdges(savedGraph.edges);
          setSelectedNode(savedGraph.nodes[0]);
          console.log("[NexusFlow] Persisted graph loaded successfully from backend storage.");
        }
      } catch (err) {
        console.warn("Backend sync note: operating with resilient client store", err.message);
      }
    };

    fetchBackendData();
  }, [setNodes, setEdges]);

  // Handlers
  const handleSelectDeviceForTelemetry = useCallback((device) => {
    setSelectedDeviceForTelemetry(device);
    setActivePage("telemetry");
  }, []);

  const handleOpenNodeConfig = useCallback((node) => {
    setSelectedNode(node);
    setActivePage("nodeConfig");
  }, []);

  // Persistent Graph Save
  const handleSaveGraph = useCallback(
    async (graph) => {
      console.log("[NexusFlow] Persisting graph DAG to backend:", graph);
      try {
        localStorage.setItem("nexusflow-graph", JSON.stringify({ nodes: graph.nodes, edges: graph.edges }));
        await ruleService.saveGraph({
          ruleId: "rule-1",
          graph: { nodes: graph.nodes, edges: graph.edges },
        });
      } catch (e) {
        console.warn("Graph save error:", e);
      }
    },
    []
  );

  const handleRunGraph = useCallback(() => {
    setActivePage("liveExecution");
  }, []);

  const handleViewJson = useCallback(() => {
    setActivePage("graphJson");
  }, []);

  const handleEditRuleInBuilder = useCallback((rule) => {
    setActivePage("ruleBuilder");
  }, []);

  // Protected pages are only rendered after the demo login/register flow.

  // Auth Screen Renders
  if (activePage === "login" || (!isAuthenticated && activePage !== "register")) {
    return (
      <Login
        onLoginSuccess={() => {
          sessionStorage.setItem("nexusflow-auth", "true");
          setIsAuthenticated(true);
          setActivePage("dashboard");
        }}
        onNavigateRegister={() => setActivePage("register")}
      />
    );
  }

  if (activePage === "register") {
    return (
      <Register
        onRegisterSuccess={() => {
          sessionStorage.setItem("nexusflow-auth", "true");
          setIsAuthenticated(true);
          setActivePage("dashboard");
        }}
        onNavigateLogin={() => setActivePage("login")}
      />
    );
  }

  // Active Screen Selector
  const renderCurrentPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            devices={devices}
            alerts={alerts}
            rules={rules}
            setActivePage={setActivePage}
          />
        );
      case "devices":
        return (
          <Devices
            devices={devices}
            setDevices={setDevices}
            onSelectDeviceForTelemetry={handleSelectDeviceForTelemetry}
          />
        );
      case "telemetry":
        return (
          <Telemetry
            selectedDevice={selectedDeviceForTelemetry}
          />
        );
      case "ruleBuilder":
        return (
          <RuleBuilder
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            onOpenNodeConfig={handleOpenNodeConfig}
            onSaveGraph={handleSaveGraph}
            onRunGraph={handleRunGraph}
            onViewJson={handleViewJson}
            setActivePage={setActivePage}
          />
        );
      case "nodeConfig":
        return (
          <NodeConfiguration
            selectedNode={selectedNode}
            nodes={nodes}
            setNodes={setNodes}
            devices={devices}
            onBackToBuilder={() => setActivePage("ruleBuilder")}
          />
        );
      case "graphJson":
        return (
          <GraphJSON
            nodes={nodes}
            edges={edges}
            onBackToBuilder={() => setActivePage("ruleBuilder")}
          />
        );
      case "liveExecution":
        return (
          <Execution
            onBackToBuilder={() => setActivePage("ruleBuilder")}
          />
        );
      case "automationRules":
        return (
          <AutomationRules
            rules={rules}
            setRules={setRules}
            setActivePage={setActivePage}
            onEditRuleInBuilder={handleEditRuleInBuilder}
          />
        );
      case "alerts":
        return (
          <Alerts
            alerts={alerts}
            setAlerts={setAlerts}
            setActivePage={setActivePage}
          />
        );
      case "admin":
        return (
          <Admin
            setActivePage={setActivePage}
          />
        );
      case "settings":
        return (
          <Settings />
        );
      default:
        return (
          <Dashboard
            devices={devices}
            alerts={alerts}
            rules={rules}
            setActivePage={setActivePage}
          />
        );
    }
  };

  const unreadAlerts = alerts.filter((a) => !a.read).length;

  return (
    <div className="app-container">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        unreadAlerts={unreadAlerts}
        onLogout={() => {
          sessionStorage.removeItem("nexusflow-auth");
          setIsAuthenticated(false);
          setActivePage("login");
        }}
      />

      {/* Main Content Layout */}
      <div className="main-content-layout">
        {/* Top Reference Design Banner */}
        <TopProjectBanner />

        {/* Top Navbar */}
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          setIsMobileOpen={setIsMobileOpen}
          alerts={alerts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Page Content */}
        <main className="page-content-wrapper">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
