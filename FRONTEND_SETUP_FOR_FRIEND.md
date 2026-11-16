# NexusFlow Frontend - Run on Another Laptop

This guide is for running the React/Vite frontend demo on a Windows laptop. MongoDB and the backend server are **not required** to view and use the frontend demo screens. API-dependent content may use the bundled demo data until the backend team provides a reachable API.

## Requirements

- Windows 10 or Windows 11
- Node.js 22 LTS (or Node.js 20.19+)
- npm (installed with Node.js)
- Internet connection for the first dependency installation
- A modern browser such as Chrome or Edge

Download Node.js from https://nodejs.org/ and install the LTS release. After installation, open a new Command Prompt and check:

```bat
node -v
npm -v
```

## Quick start

1. Extract the complete `NexusFlow_Complete_Project` ZIP.
2. Open the extracted `nexusflow` folder.
3. Double-click `run-frontend.bat`.
4. Wait for `npm install` to finish.
5. When Vite starts, open **http://localhost:5173** in Chrome or Edge.

## Manual start

Open Command Prompt or the VS Code terminal inside the `nexusflow` folder and run:

```bat
npm install
npm run dev
```

Open the local URL printed in the terminal (normally `http://localhost:5173`). Keep the terminal window open while using the app. Press `Ctrl+C` to stop the development server.

## Demo login

The current login and registration are frontend-only demo flows. No real user account is created and no server-side authentication is performed. The prefilled form can be submitted with the **Login** button. Logout returns to the Login screen.

## What works without backend

- Login/register screen navigation (demo only)
- Dashboard and bundled demo metrics
- Device and telemetry demo screens
- React Flow visual rule builder and custom nodes
- Node configuration
- Graph JSON viewer and download
- Frontend execution and alert screens using demo data
- Saved visual graph in the same browser's local storage

## Important notes

- Keep the extracted folder structure intact; do not run commands from the parent folder unless it contains `package.json`.
- The browser's local storage is specific to that browser profile and laptop. It does not sync between computers.
- Real IoT hardware data, server authentication, shared graph storage, and live backend events require the backend and database to be configured separately by the responsible teammates.
- If port 5173 is already in use, Vite will print another available local URL. Open the URL shown in the terminal.

## Build check

To create a production frontend build, run:

```bat
npm run build
```

The generated frontend files are placed in the `dist` folder.
