import React, {
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import "./App.css";

// Components
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import { TopProjectBanner } from "./components/TopProjectBanner";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";

// Lazy-loaded Pages
const Login = lazy(() =>
  import("./pages/Login/Login").then((module) => ({ default: module.Login }))
);
const Register = lazy(() =>
  import("./pages/Register/Register").then((module) => ({ default: module.Register }))
);
const Dashboard = lazy(() =>
  import("./pages/Dashboard/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const Devices = lazy(() =>
  import("./pages/Devices/Devices").then((module) => ({ default: module.Devices }))
);
const Telemetry = lazy(() =>
  import("./pages/Telemetry/Telemetry").then((module) => ({ default: module.Telemetry }))
);
const RuleBuilder = lazy(() =>
  import("./pages/RuleBuilder/RuleBuilder").then((module) => ({ default: module.RuleBuilder }))
);
const NodeConfiguration = lazy(() =>
  import("./pages/NodeConfiguration/NodeConfiguration").then((module) => ({ default: module.NodeConfiguration }))
);
const GraphJSON = lazy(() =>
  import("./pages/GraphJSON/GraphJSON").then((module) => ({ default: module.GraphJSON }))
);
const Execution = lazy(() =>
  import("./pages/Execution/Execution").then((module) => ({ default: module.Execution }))
);
const Alerts = lazy(() =>
  import("./pages/Alerts/Alerts").then((module) => ({ default: module.Alerts }))
);
const AutomationRules = lazy(() =>
  import("./pages/AutomationRules/AutomationRules").then((module) => ({ default: module.AutomationRules }))
);
const Settings = lazy(() =>
  import("./pages/Settings/Settings").then((module) => ({ default: module.Settings }))
);
const Admin = lazy(() =>
  import("./pages/Admin/Admin").then((module) => ({ default: module.Admin }))
);

// Services
import { deviceService, ruleService, alertService } from "./services/api";

// Fallback Mock Data
import {
  INITIAL_DEVICES,
  INITIAL_ALERTS,
  INITIAL_AUTOMATION_RULES,
  INITIAL_REACT_FLOW_NODES,
  INITIAL_REACT_FLOW_EDGES,
} from "./data/mockData";

// Loading fallback
const PageLoader = () => (
  <LoadingSpinner message="Loading NexusFlow..." size={40} />
);

export function App() {
  // Navigation & Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("nexusflow-auth") === "true"
  );
  const [activePage, setActivePage] = useState(
    () =>
      sessionStorage.getItem("nexusflow-auth") === "true"
        ? "dashboard"
        : "login"
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // App Data States
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [rules, setRules] = useState(INITIAL_AUTOMATION_RULES);
  const [selectedDeviceForTelemetry, setSelectedDeviceForTelemetry] =
    useState(null);

  // React Flow Nodes and Edges State
  const [nodes, setNodes, onNodesChange] = useNodesState(
    INITIAL_REACT_FLOW_NODES
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    INITIAL_REACT_FLOW_EDGES
  );
  const [selectedNode, setSelectedNode] = useState(
    INITIAL_REACT_FLOW_NODES[0]
  );

  // Restore saved workflow
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

  // Load optional persistent data from backend API
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [loadedDevices, loadedRules, loadedAlerts, savedGraph] =
          await Promise.all([
            deviceService.getAll(),
            ruleService.getAll(),
            alertService.getAll(),
            ruleService.getGraph("rule-1"),
          ]);

        if (loadedDevices && loadedDevices.length) {
          setDevices(loadedDevices);
        }

        if (loadedRules && loadedRules.length) {
          setRules(loadedRules);
        }

        if (loadedAlerts && loadedAlerts.length) {
          setAlerts(loadedAlerts);
        }

        if (savedGraph?.nodes?.length) {
          setNodes(savedGraph.nodes);

          if (savedGraph.edges) {
            setEdges(savedGraph.edges);
          }

          setSelectedNode(savedGraph.nodes[0]);

          console.log(
            "[NexusFlow] Persisted graph loaded successfully from backend storage."
          );
        }
      } catch (err) {
        console.warn(
          "Backend sync note: operating with resilient client store",
          err.message
        );
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
  const handleSaveGraph = useCallback(async (graph) => {
    console.log("[NexusFlow] Persisting graph DAG to backend:", graph);

    try {
      localStorage.setItem(
        "nexusflow-graph",
        JSON.stringify({ nodes: graph.nodes, edges: graph.edges })
      );

      await ruleService.saveGraph({
        ruleId: "rule-1",
        graph: { nodes: graph.nodes, edges: graph.edges },
      });
    } catch (error) {
      console.warn("Graph save error:", error);
    }
  }, []);

  const handleRunGraph = useCallback(() => {
    setActivePage("liveExecution");
  }, []);

  const handleViewJson = useCallback(() => {
    setActivePage("graphJson");
  }, []);

  const handleEditRuleInBuilder = useCallback(() => {
    setActivePage("ruleBuilder");
  }, []);

  // Authentication screens
  if (activePage === "login" || (!isAuthenticated && activePage !== "register")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Login
          onLoginSuccess={() => {
            sessionStorage.setItem("nexusflow-auth", "true");
            setIsAuthenticated(true);
            setActivePage("dashboard");
          }}
          onNavigateRegister={() => setActivePage("register")}
        />
      </Suspense>
    );
  }

  if (activePage === "register") {
    return (
      <Suspense fallback={<PageLoader />}>
        <Register
          onRegisterSuccess={() => {
            sessionStorage.setItem("nexusflow-auth", "true");
            setIsAuthenticated(true);
            setActivePage("dashboard");
          }}
          onNavigateLogin={() => setActivePage("login")}
        />
      </Suspense>
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
        return <Telemetry selectedDevice={selectedDeviceForTelemetry} />;

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
        return <Admin setActivePage={setActivePage} />;

      case "settings":
        return <Settings />;

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

  const unreadAlerts = alerts.filter((alert) => !alert.read).length;

  return (
    <div className="app-container">
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

      <div className="main-content-layout">
        <TopProjectBanner />

        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          setIsMobileOpen={setIsMobileOpen}
          alerts={alerts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="page-content-wrapper">
          <Suspense fallback={<PageLoader />}>
            {renderCurrentPage()}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;