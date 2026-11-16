@echo off
setlocal
cd /d "%~dp0"
echo ============================================
echo NexusFlow - Frontend Setup and Launcher
echo ============================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js LTS from https://nodejs.org/ and reopen this file.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js LTS and reopen this file.
  pause
  exit /b 1
)
echo Installing project dependencies. This may take a few minutes...
npm install
if errorlevel 1 (
  echo Dependency installation failed. Check your internet connection and try again.
  pause
  exit /b 1
)
echo Starting NexusFlow frontend...
echo Open http://localhost:5173 in your browser.
npm run dev
pause
