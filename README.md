# NexusFlow – Visual IoT Telemetry & Rule Engine

> **Project UI Design Chart – As per Infotact Solutions Guidelines**
> **Tech Stack:** MERN Stack • React Flow (`@xyflow/react`) • RxJS • MongoDB • Recharts • Socket.IO

---

## 🌟 Overview

**NexusFlow** is a modern, production-grade Visual IoT Telemetry & Rule Engine platform. It empowers engineers to monitor connected IoT fleets in real-time, inspect multi-sensor telemetry, build reactive automation workflows via a visual drag-and-drop DAG canvas, and evaluate telemetry streams reactively using **RxJS** and **MongoDB**.

---

## 🎨 Visual Design System

- **Background:** Deep cyber dark navy (`#050B1F`, `#08152F`) with multi-point radial mesh gradients.
- **Glassmorphism:** Frosted translucent cards (`rgba(11, 23, 50, 0.75)` with `14px` blur), border glow highlights, and glowing pill badges.
- **Accents:** Neon Cyan (`#00D9FF`), Electric Violet (`#773CFF`), Primary Blue (`#087BFF`), and Status Emerald (`#00D68F`).
- **Typography:** Modern geometric typography featuring **Plus Jakarta Sans** and **JetBrains Mono** for code/telemetry.

---

## ⚡ Key Architectural Implementations

### 1. RxJS Reactive Telemetry Pipeline (`server/engine/rxjsStreamEngine.js`)
- **Ingestion Stream:** Telemetry points are ingested into an RxJS `Subject`.
- **Sliding Window Moving Average:** Computes real-time moving averages dynamically via `pipe(filter(), map(), scan())`.
- **Reactive Threshold Stream:** Monitors sensor spikes (e.g. `Temp > 35°C`) with `debounceTime()` and dispatches automated actions.
- **Active Rule Evaluation:** As live telemetry flows through the pipeline, active DAG graphs are automatically evaluated and events are emitted.

### 2. Directed Acyclic Graph (DAG) Validation (`server/engine/ruleEngine.js`)
- **Cycle Detection:** Strictly detects and rejects directed cycles (`A -> B -> C -> A`) using Depth First Search (DFS) with recursion state tracking.
- **Self-Loop Detection:** Rejects edges where `source === target`.
- **Semantic Connection Rules:** Enforces that Data Sources cannot have incoming inputs, and Action Triggers cannot have outgoing outputs.
- **Reachability Verification:** Confirms at least one Action Trigger is reachable from an active Data Source.

### 3. Persistent Graph Operations & MongoDB Storage
- **Mongoose Models:** `Device`, `Telemetry`, `Rule`, `Alert` models with indexed schemas.
- **Persistent Graph Storage:** Saves and loads visual flow nodes, handles, and edge configurations via `POST /api/rules/save-graph` and `GET /api/rules/:id/graph`.
- **Resilient Dual Storage:** Connects to native MongoDB (`mongodb://localhost:27017/nexusflow`), with automatic fallback to persistent on-disk JSON storage if MongoDB is not running locally.

### 4. Real Socket.IO WebSocket Communication
- Connected via `socket.io` (backend) and `socket.io-client` (frontend).
- Server broadcasts `telemetry:tick`, `rule:triggered`, and `alert:new`.
- Client triggers edge simulations via `simulate:overheat`.
- CORS restricted to authorized frontend origins configured via `FRONTEND_URL`.

---

## 🖥️ Screen Suite (10 Core Screens + Extras)

1. **Login Screen:** Holographic cyber globe sphere, email/password fields, "Remember Me", Google OAuth, "Welcome Back!" card.
2. **Register Screen:** 3D isometric cyber city illustration, full account registration form.
3. **Main Dashboard:** Hero greeting (*"Welcome, Yashi! 👋"*), KPI stat cards (12 Devices, 8 Online, 4 Alerts), dual Recharts area chart with 24h filter, live sensor sparklines.
4. **Device Monitoring:** Device list, search/filters, mini sparkline graphs, "+ Add Device" modal, and interactive overheat test trigger.
5. **Telemetry View:** Temperature, Humidity, and Air Quality tabs, big 24°C KPI gauge, real-time glowing cyan curve, live ticker, and CSV export.
6. **Visual Rule Builder (DAG Engine):** React Flow drag-and-drop workflow canvas with 4 categories (Data Sources, Math Operations, Filter/Condition, Action Triggers), zoom/fit, connection validator, and Save/Run controls.
7. **Node Configuration:** Inspector drawer to tune parameters, select device bindings, comparison operators, and threshold sliders.
8. **Graph JSON Serialization:** Deterministic DAG JSON schema viewer with 1-click Copy JSON and Download JSON.
9. **Live Rule Execution:** Interactive real-time temperature slider (drag above 35°C to watch the rule fire!), animated glowing connection wires, and millisecond execution log terminal.
10. **Alerts & Notifications:** High Temp, Fan ON, Device Online, Sensor Offline alerts, category filters (SMS, Webhook, System), and dismiss actions.
11. **Automation Rules:** List of automated rules (`IF Temp > 35°C -> Send SMS`) with active/inactive toggles and execution logs.
12. **Profile & Settings:** User profile (Yashi), notification toggle, dark mode toggle, language selector, and edge API key generator modal.
13. **Admin Dashboard:** 98% circular health gauge, 4-Week Development Plan, Team Work Distribution, and GitHub commit milestones.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js:** v20.19+ or v22.12+ (Node.js 22 LTS recommended)
- **npm:** v9.0.0 or higher
- **MongoDB:** (Optional) Local instance at `mongodb://localhost:27017` or MongoDB Atlas.

---

### Installation

```bash
# Clone or extract the project directory
cd nexusflow

# Install dependencies
npm install
```

---


### Frontend-only setup (for teammates / another laptop)

If you are responsible only for the frontend, MongoDB and the backend server are not required to launch the UI demo. Extract the ZIP, open the `nexusflow` folder, and double-click `run-frontend.bat` on Windows. Alternatively run `npm install` followed by `npm run dev`, then open the Vite URL (normally `http://localhost:5173`). See [FRONTEND_SETUP_FOR_FRIEND.md](./FRONTEND_SETUP_FOR_FRIEND.md) for the full handoff guide.

**Demo limitations:** Login and registration are client-side demo flows, not secure authentication. Dashboard/device/telemetry views may use bundled sample data and the socket client can use a local simulated ticker when the backend is unavailable. Graphs are saved to the current browser's local storage when using Save; this is not shared across laptops. Live hardware telemetry, server-side identity, and shared database persistence require the backend/database services to be configured separately.

### Running the Application

#### 1. Start the Frontend (Vite Dev Server)
```bash
npm run dev
# Running at: http://localhost:5173
```

#### 2. Start the Backend API & Socket.IO Server
```bash
npm run server
# Running at: http://localhost:5000
```

#### 3. Run Automated Test Suite
```bash
npm test
# Executes 17 integration and unit tests covering HTTP APIs, RxJS streams, and DAG cycles
```

#### 4. Build for Production
```bash
npm run build
# Production assets generated in dist/
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health check (API, MongoDB status, WebSocket port, RxJS status) |
| `GET` | `/api/devices` | List all connected IoT devices |
| `POST` | `/api/devices` | Register and persist a new IoT device |
| `GET` | `/api/telemetry/:deviceId` | Retrieve historical telemetry for a sensor |
| `POST` | `/api/telemetry/ingest` | Ingest live sensor telemetry into the RxJS stream pipeline |
| `GET` | `/api/rules` | List all automation rules |
| `GET` | `/api/rules/:id/graph` | Retrieve persisted DAG graph (nodes & edges) |
| `POST` | `/api/rules/save-graph` | Persist visual DAG graph into database storage |
| `POST` | `/api/rules/validate` | Validate visual DAG (detects cycles, self-loops, reachability) |
| `POST` | `/api/rules/execute` | Execute DAG graph against runtime sensor inputs |
| `GET` | `/api/alerts` | List all incident & dispatch alerts |
| `PUT` | `/api/alerts/mark-all-read` | Mark all alerts as read |

---

## 👥 Project Team & Work Distribution

- **Yashi:** Frontend Lead (React Flow & UI Components)
- **Veeresham:** Database Architecture (MongoDB Schemas)
- **Sumaira:** Backend Development (Node.js + RxJS)
- **Afjal:** Dashboard Analytics & Quality Testing

---

## 📄 License
MIT License. Developed for Infotact Solutions Guidelines Review.
